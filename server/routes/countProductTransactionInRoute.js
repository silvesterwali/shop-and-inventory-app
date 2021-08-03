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
const CPTransactionIn = require('../controllers/CountProductTransactionInController')
router.get('/', CPTransactionIn.index)

module.exports = router
