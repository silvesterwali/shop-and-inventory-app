const express = require('express')
const auth = require('../middleware/auth')

const router = express.Router()

const userController = require('../controllers/UserController')
router.use(auth)

router.get('/', userController.getUsers)
router.get('/:userId/user', userController.userDetails)

module.exports = router
