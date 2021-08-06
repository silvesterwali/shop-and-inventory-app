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
const CountProductInTransactionOut = require('../controllers/CountProductTransactionOutController')
router.get('/', CountProductInTransactionOut.index)

module.exports = router
