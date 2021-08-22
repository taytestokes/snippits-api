const Snippit = require('../../models/snippit')

module.exports = async (req, res, next) => {
  const snippitId = req.params.snippitId

  return Snippit.findById(snippitId)
    .then((snippit) => {
      return res.status(200).json({
        message: `Snippit - ${snippitId} found!`,
        snippit
      })
    })
    .catch((error) => next(error))
}
