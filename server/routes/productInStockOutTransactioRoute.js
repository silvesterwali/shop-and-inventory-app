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
router.use(auth)
const productInStockOutTransaction = require('../controllers/ProductInStockOutTransactionController.js')
router.get('/', productInStockOutTransaction.index)

module.exports = router
