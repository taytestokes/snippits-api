const Snippit = require('models/snippit')

module.exports = async (req, res, next) => {
  const { title, code, language } = req.body
  const { userId } = req

  try {
    const newSnippit = new Snippit({
      title,
      code,
      language,
      author: userId
    })

    const savedSnippit = await newSnippit.save()

    if (savedSnippit) {
      return res.status(200).json({
        message: 'New snippit created!'
      })
    }
  } catch (error) {
    error.statusCode = 404
    next(error)
  }
}
