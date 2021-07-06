/* eslint-disable no-console */
require('dotenv').config({ path: '../.env' })
// eslint-disable-next-line import/order
const db = require('./db')

const express = require('express')
const useragent = require('express-useragent')
const helmet = require('helmet')
const app = express()
app.use(helmet())
app.use(useragent.express()) // take the client information
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)
const cors = require('cors')
const morgan = require('morgan')

app.use(cors())
app.use(morgan('dev'))

this.init = async () => {
  await db.connect()

  const routes = require('./routes')
  app.use(routes)
}
this.init()

module.exports = app
