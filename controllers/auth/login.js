const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const validator = require('validator')

const User = require('models/user')

module.exports = async (req, res, next) => {
  const { email, password } = req.body

  if (!validator.isEmail(email) || !password) {
    return res.status(401).json({
      message: 'Invalid credentials, please try again.'
    })
  }

  try {
    const user = await User.findOne({ email })
    const hashedPassword = await bcrypt.hash(password, 12)
    const isValidPassword = await bcrypt.compare(password, hashedPassword)

    if (user && isValidPassword) {
      const token = jwt.sign(
        {
          userId: user._id.toString()
        },
        process.env.JWT_TOKEN_SECRET,
        { expiresIn: '1h' }
      )

      return res.status(200).json({
        message: 'Login Successful!',
        token
      })
    }
  } catch (error) {
    next(error)
  }
}
