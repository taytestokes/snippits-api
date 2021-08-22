const Snippit = require('models/snippit')

module.exports = async (req, res, next) => {
  const snippitId = req.params.snippitId

  return Snippit.findByIdAndRemove(snippitId)
    .then(() => {
      return res.status(200).json({
        message: `Snippit - ${snippitId} removed!`
      })
    })
    .catch((error) => next(error))
}
