const jwt = require('jsonwebtoken')
const getAuthToken = require('../utils/getAuthToken')

module.exports = (req, _, next) => {
  const token = getAuthToken(req)
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET)
    // Applies User Id to request to use later
    req.userId = decodedToken.userId
    next()
  } catch (error) {
    throw error
  }
}
