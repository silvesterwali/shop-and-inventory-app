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
const ItemDashboard = require('../controllers/ItemDashboardController')
const auth = require('../middleware/auth')
router.use(auth)
router.get('/', ItemDashboard.index)

module.exports = router
