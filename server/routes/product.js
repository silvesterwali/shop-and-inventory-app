const express = require('express')
const router = express.Router()

const product = require('../controllers/productController')
router.use(require('../middleware/auth'))
router.get('/', product.getProducts)
router.post('/', product.createProduct)
router.get('/:productId', product.getProduct)
router.put('/:productId', product.updateProduct)
router.delete('/:productId', product.deleteProduct)
module.exports = router
