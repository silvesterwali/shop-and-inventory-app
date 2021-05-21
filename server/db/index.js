/* eslint-disable no-console */

const MongoClient = require('mongodb').MongoClient
const chalk = require('chalk')
const url = process.env.MONGODB_URL

const dbName = process.env.DATABASE_NAME

class Connection {
  constructor() {
    this.db = null
    this.uri = url
  }

  connect() {
    if (this.db) {
      return Promise.resolve(this.db)
    } else {
      return MongoClient.connect(this.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        poolSize: 10,
        forceServerObjectId: true,
        serializeFunctions: true,
      })
        .then((client) => {
          this.db = client.db(dbName)
          console.log(chalk.green('connected'))
          return this.db
        })
        .catch((err) => {
          console.log(chalk.red(err))
        })
    }
  }
}

module.exports = new Connection()
