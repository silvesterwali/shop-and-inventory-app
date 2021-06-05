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
const incomingStockDetail = require('../controllers/incomingStockDetail')
router.use(auth)
router.get('/', incomingStockDetail.index)
router.post('/', incomingStockDetail.store)
router.get('/:id', incomingStockDetail.show)
router.put('/:id', incomingStockDetail.update)
router.delete('/:id', incomingStockDetail.destroy)

module.exports = router
