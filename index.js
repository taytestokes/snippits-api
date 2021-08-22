const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const getAllSnippits = require('./controllers/snippits/getAllSnippits')
const getSnippit = require('./controllers/snippits/getSnippit')
const createSnippit = require('./controllers/snippits/createSnippit')
const updateSnippit = require('./controllers/snippits/updateSnippit')
const deleteSnippit = require('./controllers/snippits/deleteSnippit')

const register = require('./controllers/auth/register')
const login = require('./controllers/auth/login')

const isAuthorized = require('./middleware/isAuthorized')

// API Application Instanciation
const app = express()

// Middleware
app.use(express.json())
app.use(
  cors({
    // TODO: Change to only allow frontend app
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
  })
)

// Routes
app.get('/snippits', isAuthorized, getAllSnippits)
app.get('/snippits/:snippitId', getSnippit)
app.post('/snippits', isAuthorized, createSnippit)
app.patch('/snippits/:snippitId', updateSnippit)
app.delete('/snippits/:snippitId', deleteSnippit)

app.post('/register', register)
app.post('/login', login)

// Default Error Handler
app.use((error, req, res, next) => {
  console.error({ defaultError: error })
  res.status(error.statusCode || 500).json({
    message: error.message || 'Sorry, something went wrong.',
    data: error.data || 'No data provided.'
  })
})

// API establishment and Database connection
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
