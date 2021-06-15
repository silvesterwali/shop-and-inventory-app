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
const cancelStockIn = require('../controllers/cancelStockIn')
router.use(auth)
router.put('/:id/stock', cancelStockIn.update)
module.exports = router
