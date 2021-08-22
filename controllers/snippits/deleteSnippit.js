const Snippit = require('models/snippit')

module.exports = async (req, res, next) => {
  const { snippitId } = req.params
  const { userId } = req

  try {
    await Snippit.findByIdAndRemove({ _id: snippitId, author: userId })
    const snippits = await Snippit.find({ author: userId })
    return res.status(200).json({
      message: `Snippit - ${snippitId} removed!`,
      snippits: snippits
    })
  } catch (error) {
    next(error)
  }
}
