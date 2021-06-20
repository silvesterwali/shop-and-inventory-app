/**
 * route for handle password change
 *
 */

const express = require('express')
const ObjectId = require('mongodb').ObjectID
const db = require('../db').db
const router = express.Router()
const auth = require('../middleware/auth')
const { passwordHash } = require('../utilities/passwordHashUtils')
const { passwordChangeRules, validate } = require('../validate/index')

/**
 * route password change
 *
 */
router.put(
  '/password-change/:userId',
  auth,
  passwordChangeRules(),
  validate,
  async (req, res) => {
    const { password } = req.body

    try {
      await db.collection('users').updateOne(
        { _id: new ObjectId(req.params.userId) },
        {
          $set: {
            password: await passwordHash(password),
          },
        }
      )
      return res.json({ message: 'Success update password' })
    } catch (err) {
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }
)

module.exports = router
