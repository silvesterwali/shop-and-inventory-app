/**
 * route for handle password change
 *
 */

const express = require('express')
const { passwordChangeRules, validate } = require('../validate')

const router = express.Router()

/**
 * route password change
 *
 * @param {express.Request} req
 * @param {express.Response} res
 *
 */
router.post(
  '/password-change',
  passwordChangeRules(),
  validate,
  (req, res) => {}
)

module.exports = router
