/* eslint-disable no-console */
const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
  return await res.json({ message: 'welcome' })
})

const auth = require('./auth')
const passwordChange = require('./passwordChange')
const profile = require('./personal')
const family = require('./family')
router.use('/auth', auth)
router.use('/auth', passwordChange)
router.use('/auth/personal', profile)
router.use('/personal/family', family)
router.use('/personal/bank-atm-card', require('./bankAtmCard'))

module.exports = router
