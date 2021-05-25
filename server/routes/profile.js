/**
 * manage personal profile
 *
 * - this is just for current user only
 * - not suggest for other management like Human resource or admin
 */

const ObjectId = require('mongodb').ObjectID
const express = require('express')
const db = require('../db').db

const { ProfileValidate, validate } = require('../validate')

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
    const profile = await db.collection('profile').findOne({ userId })
    return res.json(profile)
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
router.post('/', ProfileValidate(), validate, async (req, res) => {
  const { userId, phone, AlternatePhone, address, alternateAddress } = req.body
  try {
    await db.collection('profile').updateOne(
      { userId: new ObjectId(userId) },
      {
        $set: {
          phone,
          AlternatePhone,
          address,
          alternateAddress,
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
router.put('/:id', ProfileValidate(), validate, async (req, res) => {
  const { phone, AlternatePhone, address, alternateAddress } = req.body
  try {
    await db.collection('profile').updateOne(
      {
        _id: new ObjectId(req.params.id),
      },
      {
        phone,
        AlternatePhone,
        address,
        alternateAddress,
        updateAt: new Date(),
      },
      { upsert: true }
    )
    return res.json({ message: 'Success update profile' })
  } catch (err) {
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
