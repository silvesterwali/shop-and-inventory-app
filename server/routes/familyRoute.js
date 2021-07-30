const express = require('express')
const ObjectId = require('mongodb').ObjectID
const db = require('../db').db
const router = express.Router()
const auth = require('../middleware/auth')

/**
 * get all personal families sub collection
 *
 *
 * @param {express.Request} req
 * @param {express.Response} res
 *
 */
router.get('/:userId/user', auth, async (req, res) => {
  try {
    const userId = new ObjectId(req.params.userId)
    const personal = await db.collection('personal').findOne({ userId })
    const families = personal?.families ?? []
    return res.json(families)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)
    return res.status(500).json({ message: 'Internal Server Error Error' })
  }
})

/**
 * create family resource in personal collection
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @async
 */
router.post('/', auth, async (req, res) => {
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

/**
 * update family object on personal sub collection
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @see https://www.youtube.com/watch?v=yLjfS5iKZPM documentation
 */
router.put('/:userId/user/:familyId/family', auth, async (req, res) => {
  const { fullName, familyStatus, phoneNumber } = req.body
  const userId = new ObjectId(req.params.userId)
  const familyId = new ObjectId(req.params.familyId)
  try {
    await db.collection('personal').updateOne(
      {
        userId,
        'families._id': familyId,
      },
      {
        $set: {
          'families.$.fullName': fullName,
          'families.$.familyStatus': familyStatus,
          'families.$.phoneNumber': phoneNumber,
          'families.$.updateAt': new Date(),
        },
      }
    )
    return res.json({ message: 'Success to update collection' })
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
})

router.delete('/:userId/user/:familyId/family', auth, async (req, res) => {
  const userId = new ObjectId(req.params.userId)
  const familyId = new ObjectId(req.params.familyId)
  try {
    await db.collection('personal').updateOne(
      {
        userId,
        'families._id': familyId,
      },
      {
        $pull: {
          families: {
            _id: familyId,
          },
        },
      },
      { new: true, multi: true }
    )
    return res.json({ message: 'Success remove collection' })
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
})

module.exports = router
