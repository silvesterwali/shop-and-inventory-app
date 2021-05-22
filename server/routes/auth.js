const express = require('express')
const router = express.Router()

/**
 * route for registration authenticate
 *
 * @param {express.Request} req
 * @param {express.Response} res
 *
 */
router.post('/register', (req, res) => {})

/**
 * route for login authenticate
 *
 * @param {express.Response} req
 * @param {express.Request} res
 *
 */
router.post('/login', (req, res) => {})

/**
 * router for user refresh token
 *
 *  @param {express.Request} res
 *  @param {express.Response} res
 *
 */
router.get('refresh-token', (req, res) => {})

module.exports = router
