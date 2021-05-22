const express = require('express')

const { loginRules, registrationRules, validate } = require('../validate')
const router = express.Router()

/**
 * route for registration authenticate
 *
 * @param {express.Request} req
 * @param {express.Response} res
 *
 */
router.post('/register', registrationRules(), validate, (req, res) => {})

/**
 * route for login authenticate
 *
 * @param {express.Response} req
 * @param {express.Request} res
 *
 */
router.post('/login', loginRules(), validate, (req, res) => {})

/**
 * router for user refresh token
 *
 *  @param {express.Request} res
 *  @param {express.Response} res
 *
 */
router.get('refresh-token', (req, res) => {})

module.exports = router
