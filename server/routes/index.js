/* eslint-disable no-console */
const express = require('express')
const router = express.Router()
const db = require('../db').db
router.get('/', async (req, res) => {
  // eslint-disable-next-line no-console
  const demo = await db.collection('demo').find().toArray()
  return await res.json({ ...demo })
})

const auth = require('./auth')
const passwordChange = require('./passwordChange')

router.use('/auth', auth)
router.use('/auth', passwordChange)

module.exports = router
