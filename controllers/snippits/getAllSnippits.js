const Snippit = require('models/snippit')

module.exports = async (req, res, next) => {
  Snippit.find()
    .then((snippits) => {
      if (!snippits) {
        next(error)
      }

      res.status(200).json({
        message: 'Snippits found!',
        snippits: snippits
      })
    })
    .catch((error) => next(error))
}
