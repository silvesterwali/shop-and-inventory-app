const express = require('express')
const auth = require('../middleware/auth')

const router = express.Router()
const { registrationRules, validate } = require('../validate')
const userController = require('../controllers/UserController')
router.use(auth)

router
  .get('/', userController.index)
  .post('/', registrationRules(), validate, userController.store)
  .get('/:id/', userController.show)

module.exports = router
