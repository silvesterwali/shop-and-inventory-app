const app = require('express')()

app.all('/', (req, res) => {
  res.json({ message: 'welcome to api' })
})

module.exports = app
