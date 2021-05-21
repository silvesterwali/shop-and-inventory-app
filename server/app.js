/* eslint-disable no-console */
require('dotenv').config({ path: '../.env' })
// eslint-disable-next-line import/order
const db = require('./db')
const app = require('express')()

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
