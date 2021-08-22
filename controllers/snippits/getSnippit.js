const Snippit = require('models/snippit')

module.exports = async (req, res, next) => {
  const { snippitId } = req.params
  const { userId } = req

  try {
    const snippit = await Snippit.findOne({ _id: snippitId, author: userId })

    return res.status(200).json({
      message: `Snippit - ${snippitId} found!`,
      snippit
    })
  } catch (error) {
    next(error)
  }
}
