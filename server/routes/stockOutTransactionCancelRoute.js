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
const stockOutTransactionCancel = require('../controllers/StockOutTransactionCancelController.js')
router.use(auth)
router.put('/:id', stockOutTransactionCancel.update)

module.exports = router
