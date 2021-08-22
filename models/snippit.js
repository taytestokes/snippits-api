const mongoose = require('mongoose')

const SnippitSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    code: {
      type: String,
      required: true
    },
    language: {
      type: String,
      required: true
    },
    // References User Collection
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Snippit', SnippitSchema)
