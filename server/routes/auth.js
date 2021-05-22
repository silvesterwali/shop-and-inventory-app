const express = require('express')

const db = require('../db').db
const { generateToken } = require('../utilities/auth')
const passwordHash = require('../utilities/passwordHash').passwordHash()
const { loginRules, registrationRules, validate } = require('../validate')
const router = express.Router()

/**
 * route for registration authenticate
 *
 * @param {express.Request} req
 * @param {express.Response} res
 *
 */
router.post('/register', registrationRules(), validate, async (req, res) => {
  const { password, email } = req.body
  try {
    const user = await db.collection('users').insertOne({
      email,
      password: passwordHash(password),
      rules: ['costumer'],
      created_at: new Date(),
      updated_at: new Date(),
    })
    return res.json({ token: generateToken(user) })
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error' })
  }
})

/**
 * route for login authenticate
 *
 * @param {express.Response} req
 * @param {express.Request} res
 *
 */
router.post('/login', loginRules(), validate, async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await db.collection('users').findOne({ email })

    if (!user) {
      return res.status(422).json({ message: 'Email or password wrong' })
    }

    if (user.password !== passwordHash(password)) {
      return res.status(422).json({ message: 'Email or password wrong' })
    }
    return res.json({
      token: generateToken(user),
    })
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error' })
  }
})

/**
 * router for user refresh token
 *
 *  @param {express.Request} res
 *  @param {express.Response} res
 *
 */
router.post('refresh-token', (req, res) => {
  return res.json({
    token: generateToken(req.user),
  })
})

/**
 * router for user take their user data
 * @param {express.Request} req
 * @param {express.Response} res
 *
 */
router.get('/me', (req, res) => {})

/**
 * router for user to log out from the app
 * TODO: what the system do after user log
 * @param {express.Request} req
 * @param {express.Response} res
 *
 */
router.post('/logout', (req, res) => {})

module.exports = router
