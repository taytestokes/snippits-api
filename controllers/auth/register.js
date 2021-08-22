const bcrypt = require('bcryptjs')
const validator = require('validator')

const User = require('../../models/user')

module.exports = async (req, res, next) => {
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

    return res.status(200).json({
      message: 'User successfully created!',
      user: newUser
    })
  } catch (error) {
    next(error)
  }
}
