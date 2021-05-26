const express = require('express')
const ObjectId = require('mongodb').ObjectID()
const db = require('../db').db
const router = express.Router()
const auth = require('../middleware/auth')

router.get('/:userId/user', auth, async (req, res) => {
  try {
    const userId = new ObjectId(req.params.userId)
    const family = await db.collection('personal').findOne({ userId }).family
    return res.json(family)
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error Error' })
  }
})

router.post('/', async (req, res) => {
  const { fullName, familyStatus, phoneNumber } = req.body
  const userId = new ObjectId(req.body.userId)
  try {
    await db.collection('personal').findOneAndUpdate(
      { userId },
      {
        $push: {
          families: {
            _id: new ObjectId(),
            fullName,
            familyStatus,
            phoneNumber,
            createdAt: new Date(),
          },
        },
      }
    )
    return res.json({ message: 'success adding family' })
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
})

module.exports = router
