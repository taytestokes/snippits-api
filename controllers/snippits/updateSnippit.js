const Snippit = require('models/snippit')

module.exports = async (req, res, next) => {
  const snippitId = req.params.snippitId

  // test title from body to update
  const title = req.body.title

  return Snippit.findOneAndUpdate({ _id: snippitId }, { title }, { new: true })
    .then((snippit) => {
      return res.status(200).json({
        message: `Snippit - ${snippitId} updated!`,
        snippit
      })
    })
    .catch((error) => next(error))
}
