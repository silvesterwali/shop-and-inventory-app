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
const EmailTest = require('../controllers/EmailTestController')
router.get('/', EmailTest.index)

module.exports = router
