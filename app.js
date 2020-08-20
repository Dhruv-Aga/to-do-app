/* 
 * Setup all the configuration for express and declaring the express-app 
 * Importing all the dependencies and routes
*/

const express = require('express')
const morgan = require('morgan')
const mongoSanitize = require('express-mongo-sanitize')
var bodyParser = require('body-parser')
var cors = require('cors')

const taskRouter = require('./apps/task/routes')
const loginRouter = require('./apps/login/routes')

const app = express()


// Development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
  app.use(cors())
}

// Data sanitization against NoSQL query injection
app.use(mongoSanitize())

// Data sanitization against NoSQL query injection
app.use(bodyParser.json());

// Serving static files
app.use(express.static(`${__dirname}/public`))

// Routes '/api/${version}/${module}'
app.use('/api/v1/tasks', taskRouter)
app.use('/api/v1/users', loginRouter)

// Fallback URL
app.all('*', (req, res, next) => {
  console.log(`Can't find ${req.originalUrl} on this server!`);
  next(`Can't find ${req.originalUrl} on this server!`, 404)
})

module.exports = app
