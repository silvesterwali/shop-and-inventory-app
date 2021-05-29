const express = require('express')
const auth = require('../middleware/auth')

const router = express.Router()

const userController = require('../controllers/userController')
router.use(auth)

router.get('/', userController.getUsers)

module.exports = router
