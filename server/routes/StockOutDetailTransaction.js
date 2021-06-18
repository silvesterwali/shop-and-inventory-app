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
const StockOutDetailTransactionController = require('../controllers/StockOutDetailController')

router.use(auth)
router.get('/:stockOutId', StockOutDetailTransactionController.index)
router.post('/:StockOutId/', StockOutDetailTransactionController.store)
router.put(
  '/:StockOutId/detail/:id',
  StockOutDetailTransactionController.update
)
router.delete(
  '/:StockOutId/detail/:id',
  StockOutDetailTransactionController.destroy
)

module.exports = router
