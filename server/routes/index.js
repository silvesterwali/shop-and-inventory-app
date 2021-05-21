/* eslint-disable no-console */
const router = require('express').Router()
const db = require('../db').db
router.get('/', async (req, res) => {
  // eslint-disable-next-line no-console
  const demo = await db.collection('demo').find().toArray()
  return await res.json({ ...demo })
})
module.exports = router
