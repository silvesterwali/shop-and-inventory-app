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
const supplierController = require('../controllers/SupplierController')
router.use(auth)
router.get('/', supplierController.index)
router.post('/', supplierController.store)
router.get('/:id', supplierController.show)
router.put('/:id', supplierController.update)
router.delete('/:id', supplierController.destroy)

module.exports = router
