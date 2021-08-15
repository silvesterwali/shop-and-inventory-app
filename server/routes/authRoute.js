const express = require('express')

const bycrypt = require('bcryptjs')
const db = require('../db').db
const { generateToken } = require('../utilities/authUtils')
const { passwordHash } = require('../utilities/passwordHashUtils')
const { loginRules, registrationRules, validate } = require('../validate')
const auth = require('../middleware/auth')
const guest = require('../middleware/guest')
const gate = require('../middleware/gate')
const router = express.Router()

/**
 * route for registration authenticate
 *
 */
router.post(
  '/register',
  guest,
  registrationRules(),
  validate,
  async (req, res) => {
    const { username, password, email } = req.body
    try {
      const user = await db.collection('users').insertOne({
        username,
        email,
        password: await passwordHash(password),
        rules: ['costumer'],
        verifiedEmail: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      return res.json({ token: generateToken(user) })
    } catch (err) {
      return res.status(500).json({ message: 'Internal server error' })
    }
  }
)

/**
 * route for login authenticate
 *
 *
 */
router.post('/login', guest, loginRules(), validate, async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await db.collection('users').findOne({ email })

    if (!user) {
      return res.status(422).json({ message: 'Email or password wrong' })
    }
    const isPasswordValid = await bycrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return res.status(422).json({ message: 'Email or password wrong' })
    }

    return res.json({
      token: generateToken(user),
    })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)
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
router.post('refresh-token', auth, (req, res) => {
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
router.get('/me', auth, gate('making node'), (req, res) => {
  return res.json({ user: req.user })
})

/**
 * router for user to log out from the app
 * TODO: what the system do after user log
 * @param {express.Request} req
 * @param {express.Response} res
 *
 */
router.post('/logout', (_req, res) => {
  return res.json({ message: 'logout ' })
})

module.exports = router
