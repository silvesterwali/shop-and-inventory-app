/* eslint-disable no-console */
const express = require('express')
const router = express.Router()
router.get('/', async (req, res) => {
  return await res.json({ message: 'welcome' })
})

const auth = require('./auth')
const passwordChange = require('./passwordChange')

router.use('/auth', auth)
router.use('/auth', passwordChange)

module.exports = router
