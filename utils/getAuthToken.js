const _last = require('lodash/last')

module.exports = (request) => {
  const authHeader = request.get('Authorization')
  return _last(authHeader.split(' '))
}
