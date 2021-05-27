/* eslint-disable no-console */
const express = require('express')
const ObjectId = require('mongodb').ObjectID
const db = require('../db').db
const router = express.Router()
/**
 * get all personal bank atm card
 *
 *@param {express.Request} req
 *@param {express.Response} res
 */
router.get('/:userId/user', async (req, res) => {
  const userId = new ObjectId(req.params.userId)
  try {
    const { bankAtmCards } = await db.collection('personal').findOne({ userId })
    return res.json(bankAtmCards)
  } catch (err) {
    console.log(err)
    return res.json(500).json({ message: 'Internal Server Error' })
  }
})

/**
 * create new bank atm card resource
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
router.post('/', async (req, res) => {
  const { provider, cardNumber } = req.boy
  const userId = new ObjectId(req.body.userId)
  try {
    await db.collection('personal').findOneAndUpdate(
      {
        userId,
      },
      {
        $push: {
          bankAtmCards: {
            _id: new ObjectId(),
            provider,
            cardNumber,
            createdAt: new Date(),
          },
        },
      }
    )
    return res.json({ message: 'Success create bank atm card' })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal Server Errors' })
  }
})

/**
 * update specific bank atm card
 *
 * @param {express.Request} req
 * @param {express.Response} res
 *
 */
router.put('/:userId/user/:bankAtmCard/bank-atm-card', async (req, res) => {
  const userId = new ObjectId(req.params.userId)
  const bankAtmCardsId = new ObjectId(req.params.bankAtmCard)
  const { provider, cardNumber } = req.body
  try {
    await db.collection('personal').updateOne(
      {
        userId,
        'bankAtmCards._id': bankAtmCardsId,
      },
      {
        $set: {
          'bankAtmCards.$.provider': provider,
          'bankAtmCards.$.cardNumber': cardNumber,
          'bankAtmCards.$.updateAt': new Date(),
        },
      }
    )
    return res.json({ message: 'Success to update bank atm card' })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
})

/***
 * delete specific bank atm card
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */

router.delete('/:userId/user/:bankAtmCard/bank-atm-card', async (req, res) => {
  const userId = new ObjectId(req.params.userId)
  const bankAtmCardsId = new ObjectId(req.params.bankAtmCard)
  try {
    await db.collection('personal').updateOne(
      {
        userId,
        'bankAtmCards._id': bankAtmCardsId,
      },
      {
        $pull: {
          _id: bankAtmCardsId,
        },
      },
      { new: true, multi: true }
    )
    return res.json({ message: 'Success to delete bank atm card' })
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
})
module.exports = router
