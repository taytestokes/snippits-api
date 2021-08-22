const Snippit = require('models/snippit')

module.exports = async (req, res, next) => {
  const { userId } = req
  try {
    const snippits = await Snippit.find({ author: userId })

    return res.status(200).json({
      message: 'Snippits found!',
      snippits
    })
  } catch (error) {
    next(error)
  }
}
