const Snippit = require('../models/snippit')

// Create Snippits
exports.createSnippit = async (_, res) => {
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

// Get all snippts
exports.getAllSnippits = (req, res, next) => {
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

// Delete a single snippit
exports.deleteSnippit = (req, res, next) => {
  const snippitId = req.params.snippitId

  return Snippit.findByIdAndRemove(snippitId)
    .then(() => {
      return res.status(200).json({
        message: `Snippit - ${snippitId} removed!`
      })
    })
    .catch((error) => next(error))
}

// Find a single snippit by id
exports.getOneSnippit = (req, res, next) => {
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

// Update a single sinppit
exports.updateSnippit = (req, res, next) => {
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
