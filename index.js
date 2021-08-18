const express = require('express')
const mongoose = require('mongoose')

const snippitController = require('./controllers/snippits')

const app = express()

// Error Handler
app.use(express.json())

app.get('/snippits', snippitController.getAllSnippits)
app.get('/snippits/:snippitId', snippitController.getOneSnippit)
app.post('/snippits', snippitController.createSnippit)
app.patch('/snippits/:snippitId', snippitController.updateSnippit)
app.delete('/snippits/:snippitId', snippitController.deleteSnippit)

mongoose
  .connect(process.env.DATABASE_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(process.env.PORT)
  })
  .catch((error) => {
    console.log(new Error(error))
  })
