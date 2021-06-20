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
const incomingStockDetail = require('../controllers/StockInTransactionDetailController')
router.use(auth)
router.get('/:StockInId/main', incomingStockDetail.index)
router.post('/:StockInId/main', incomingStockDetail.store)
// router.get('/:id', incomingStockDetail.show)
router.put('/:StockInId/main/:id/detail', incomingStockDetail.update)
router.delete('/:StockInId/main/:id/detail', incomingStockDetail.destroy)

module.exports = router
