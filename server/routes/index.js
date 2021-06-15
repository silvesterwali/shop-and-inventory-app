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
router.use('/supplier', require('./supplier'))
router.use('/product', require('./product'))
router.use('/product-list', require('./productList'))
router.use('/incoming-stock', require('./incoming-stock-main'))
router.use('/incoming-stock-detail', require('./incoming-stock-detail'))
router.use('/stock', require('./stock'))
router.use('/incoming-stock-cancel', require('./cancelStock'))
module.exports = router
