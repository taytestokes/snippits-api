const jwt = require('jsonwebtoken')
const getAuthToken = require('../utils/getAuthToken')

module.exports = (req, _, next) => {
  const token = getAuthToken(req)
  try {
    const decodedToken = jwt.verify(token, 'supertopsecrettokensecret')
    req.userId = decodedToken.userId
    next()
  } catch (error) {
    throw error
  }
}
