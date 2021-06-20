/**
 * manage personal profile
 *
 * - this is just for current user only
 * - not suggest for other management like Human resource or admin
 */

const ObjectId = require('mongodb').ObjectID
const express = require('express')
const db = require('../db').db

const { personalValidate, validate } = require('../validate')

const router = express.Router()

/**
 * retrieve user profile
 *
 * @param {any} userId
 * @param {express.Request} req
 * @param {express.Response} res
 *
 */
router.get('/:userId', async (req, res) => {
  try {
    const userId = new ObjectId(req.params.userId)
    const personal = await db.collection('personal').findOne({ userId })
    return res.json(personal)
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server error' })
  }
})

/**
 * create user profile
 *
 * @param {express.Request} req
 * @param {express.Response} res
 *
 */
router.post('/', personalValidate(), validate, async (req, res) => {
  const {
    userId,
    fullName,
    phone,
    alternatePhone,
    address,
    alternateAddress,
    biography,
  } = req.body
  try {
    await db.collection('personal').updateOne(
      { userId: new ObjectId(userId) },
      {
        $set: {
          fullName,
          phone,
          alternatePhone,
          address,
          alternateAddress,
          biography,
          createdAt: new Date(),
        },
      },
      { upsert: true }
    )
    return res.json({ message: 'Success to create profile' })
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error' })
  }
})

/**
 * update user profile
 *
 *
 * @param {any} id
 * @param {express.Request} req
 * @param {express.Response} res
 *
 **/
router.put('/:id', personalValidate(), validate, async (req, res) => {
  const {
    fullName,
    phone,
    alternatePhone,
    address,
    alternateAddress,
    biography,
  } = req.body
  try {
    await db.collection('personal').updateOne(
      {
        _id: new ObjectId(req.params.id),
      },
      {
        $set: {
          fullName,
          phone,
          alternatePhone,
          address,
          alternateAddress,
          biography,
          updatedAt: new Date(),
        },
      },

      { upsert: true }
    )
    return res.json({ message: 'Success update profile' })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)
    return res.status(500).json({ message: 'Internal Server errors' })
  }
})

/**
 * delete user profile
 *
 * @param {any} id
 * @param {express.Request} req
 * @param {express.Response} res
 *
 */
router.delete('/:id', (req, res) => {})

module.exports = router
