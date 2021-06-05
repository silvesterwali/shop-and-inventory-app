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
const incomingStock = require('../controllers/incomingStockMain')
router.use(auth)
router.get('/', incomingStock.index)
router.post('/', incomingStock.post)
router.get('/:id', incomingStock.show)
router.put('/:id', incomingStock.update)
router.delete('/:id', incomingStock.destroy)

module.exports = router
