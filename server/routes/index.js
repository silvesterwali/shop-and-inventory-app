/* eslint-disable no-console */
const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
  return await res.json({ message: 'welcome' })
})

const auth = require('./authRoute')
const passwordChange = require('./passwordChangeRoute')
const profile = require('./personalRoute')
const family = require('./familyRoute')

router.use('/auth', auth)
router.use('/auth', passwordChange)
router.use('/auth/personal', profile)
router.use('/personal/family', family)
router.use('/personal/account', require('./bankAtmCardRoute'))
router.use('/user', require('./usersRoute'))
router.use('/supplier', require('./supplierRoute'))
router.use('/product', require('./productRoute'))
router.use('/product-list', require('./productListRoute'))
router.use('/incoming-stock', require('./stockInRoute'))
router.use('/incoming-stock-detail', require('./stockInTransactionDetailRoute'))
router.use('/stock', require('./stockInTransactionApproveRoute'))
router.use('/customer', require('./CustomerRoute'))
router.use('/brand', require('./brandRoute'))
router.use('/branch', require('./BranchRoute'))
router.use('/feedback', require('./feedbackRoute'))
router.use('/item-dashboard', require('./itemDashboardRoute'))
router.use('/email-test', require('./EmailTestRoute'))
router.use('/todo', require('./todoRoute'))
router.use(
  '/incoming-stock-cancellation',
  require('./stockInTransactionCancelRoute')
)
router.use('/stock-out-transaction', require('./stockOutTransactionRoute'))
router.use(
  '/stock-out-transaction-detail',
  require('./stockOutTransactionDetailRoute')
)
router.use(
  '/stock-out-transaction-approve',
  require('./stockOutTransactionApproveRoute')
)
router.use(
  '/stock-out-transaction-cancel',
  require('./stockOutTransactionCancelRoute')
)
router.use(
  '/product-in-stock-out-transaction',
  require('./productInStockOutTransactionRoute')
)

router.use(
  '/count-product-transaction-in',
  require('./countProductTransactionInRoute')
)
router.use(
  '/count-product-transaction-out',
  require('./countProductTransactionOutRoute')
)
module.exports = router
