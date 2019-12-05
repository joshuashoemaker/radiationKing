// Environment
const createError = require('http-errors')
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const session = require('express-session')

// Import Routes
const apiRouter = require('./routes/api')

// Init Express
const app = express()

// Express Config
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '/build')))

// parse application/json
app.use(bodyParser.json())

// Create session with secret
app.use(session({
  secret: 'marklucasisKinGtimesa1000000000',
  resave: true,
  saveUninitialized: true
}))

// Open up Custon Headers from any server or port - will change on build
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*')
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,HEAD,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type,x-requested-with')
  next()
})

// Init Routes
app.use('/api', apiRouter)

app.get('*', function (request, response) {
  response.sendFile(path.join(__dirname, '/build/index.html'))
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.send('error')
})

module.exports = app
