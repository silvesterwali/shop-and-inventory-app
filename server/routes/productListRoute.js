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
const productListController = require('../controllers/ProductListController')
router.use(auth)
router.get('/', productListController.index)

module.exports = router
