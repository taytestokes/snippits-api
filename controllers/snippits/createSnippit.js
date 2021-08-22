const Snippit = require('../../models/snippit')

module.exports = async (req, res, next) => {
  // TODO: Update this so user cna create one
  const newSnippit = new Snippit({
    title: 'Test',
    code: '<h1>This is a code block</h1>',
    language: 'HTML',
    author: 'Tayte Stokes'
  })

  await newSnippit.save()

  return res.status(200).json({
    message: 'New snippit created, yay!'
  })
}
