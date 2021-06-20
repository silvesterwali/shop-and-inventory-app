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
const StockOutTransactionApprove = require('../controllers/StockOutTransactionApproveController.js')
router.use(auth)

router.put('/:id', StockOutTransactionApprove.update)

module.exports = router
