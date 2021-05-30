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
router.use('/personal/account', require('./bankAtmCard'))
router.use('/users', require('./users'))
router.use('product/', require('./product'))
module.exports = router
