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
const approveStockOutTransaction = require('../controllers/approveStockOutTransaction.js')
router.use(auth)

router.put('/:id', approveStockOutTransaction.update)

module.exports = router
