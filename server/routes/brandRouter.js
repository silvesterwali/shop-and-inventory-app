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
const Brand = require('../controllers/BrandController')
router.use(auth)
router.get('/', Brand.index)
router.post('/', Brand.store)
router.get('/:id', Brand.show)
router.put('/:id', Brand.update)
router.delete('/:id', Brand.destroy)

module.exports = router
