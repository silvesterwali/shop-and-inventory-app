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
const customer = require('../controllers/CustomerController')
const auth = require('../middleware/auth')
const router = express.Router()
router.use(auth)
router.get('/', customer.index)
router.post('/', customer.store)
router.get('/:id', customer.show)
router.put('/:id', customer.update)
router.delete('/:id', customer.destroy)

module.exports = router
