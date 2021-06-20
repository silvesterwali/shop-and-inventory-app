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
const StockOutDetailTransactionController = require('../controllers/StockOutTransactionDetailController')

router.use(auth)
router.get('/:stockOutId', StockOutDetailTransactionController.index)
router.post('/:stockOutId/', StockOutDetailTransactionController.store)
router.put(
  '/:stockOutId/detail/:id',
  StockOutDetailTransactionController.update
)
router.delete(
  '/:stockOutId/detail/:id',
  StockOutDetailTransactionController.destroy
)

module.exports = router
