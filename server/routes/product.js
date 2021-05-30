const express = require('express')
const router = express.Router()

const product = require('../controllers/productController')
router.get('/', product.getProducts)
router.post('/', product.createProduct)
router.put('/:productId', product.updateProduct)
router.delete('/:productId', product.deleteProduct)
module.exports = router
