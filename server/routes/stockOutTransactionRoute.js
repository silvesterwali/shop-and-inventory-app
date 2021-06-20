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
const auth = require('../middleware/auth')
const router = express.Router()
const StockOutTransaction = require('../controllers/StockOutTransactionController')

router.use(auth)
router.get('/', StockOutTransaction.index)
router.post('/', StockOutTransaction.store)
router.get('/:id', StockOutTransaction.show)
router.put('/:id', StockOutTransaction.update)
router.delete('/:id', StockOutTransaction.destroy)

module.exports = router
