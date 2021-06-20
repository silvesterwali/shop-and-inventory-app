/**
 *=============================================
 * - @copyright 2021
 *
 * router
 *
 *
 *
 *
 *
 **/

const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const stockOutTransactionCancel = require('../controllers/StockOutTransactionCancel.js')
router.use(auth)
router.put('/:id', stockOutTransactionCancel.update)

module.exports = router
