const Snippit = require('models/snippit')

module.exports = async (req, res, next) => {
  const { snippitId } = req.params
  const { title, code, language } = req.body
  const { userId } = req

  try {
    const snippit = await Snippit.findOneAndUpdate(
      { _id: snippitId, author: userId },
      { title, code, language },
      { new: true }
    )

    return res.status(200).json({
      message: `Snippit - ${snippitId} updated!`,
      snippit
    })
  } catch (error) {
    next(error)
  }
}
