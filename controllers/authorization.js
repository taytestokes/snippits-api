const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const validator = require('validator')

const User = require('../models/user')

exports.login = (req, res, next) => {
  const { email, password } = req.body

  if (!validator.isEmail(email)) {
    return res.status(401).json({
      message: 'Invalid email, please try again.'
    })
  }

  // Hash and compare password sent in req to hashed password stored

  res.status(200).json({
    message: 'Logged in!'
  })
}

// Register User Into Application
exports.register = async (req, res, next) => {
  const { email, password } = req.body

  if (!validator.isEmail(email) || !password) {
    return res.status(401).json({
      message: 'Invalid credentials, please try again.'
    })
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 12)
    const user = new User({
      email,
      password: hashedPassword
    })

    const newUser = await user.save()

    console.log(newUser)

    res.status(200).json({
      message: 'User successfully created!',
      user: newUser
    })
  } catch (error) {
    // Do something with the error
    console.log(error)
  }
}
