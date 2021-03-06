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
const stockIncrease = require('../controllers/StockInTransactionApproveController')
router.put('/:id/stock-increase', stockIncrease.update)

module.exports = router
