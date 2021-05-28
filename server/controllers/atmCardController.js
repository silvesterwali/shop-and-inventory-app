/* eslint-disable no-console */

const ObjectId = require('mongodb').ObjectID
const db = require('../db').db

/**
 * getPersonalAtmCard
 *
 * - get personal bank atm card
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
export const getPersonalAtmCard = async (req, res) => {
  const userId = new ObjectId(req.params.userId)
  try {
    const { bankAtmCards } = await db.collection('personal').findOne({ userId })
    return res.json(bankAtmCards)
  } catch (err) {
    console.log(err)
    return res.json(500).json({ message: 'Internal Server Error' })
  }
}

/**
 * createPersonalAtmCard
 *
 * - create new  personal bank atm card resource
 * @param {express.Request} req
 * @param {express.Response} res
 */
export const createPersonalAtmCard = async (req, res) => {
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
}

/**
 * updatePersonalBankAtmCard
 *
 * - update specific object personal  bank atm card resource
 * @param {express.Request} req
 * @param {express.Response} res
 */
export const updatePersonalBankAtmCard = async (req, res) => {
  const userId = new ObjectId(req.params.userId)
  const bankAtmCardsId = new ObjectId(req.params.bankAtmCardId)
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
}

/**
 * deletePersonalBankAtmCard
 *
 * - delete object personal  bank atm card resource
 * @param {express.Request} req
 * @param {express.Response} res
 */
export const deletePersonalBankAtmCard = async (req, res) => {
  const userId = new ObjectId(req.params.userId)
  const bankAtmCardsId = new ObjectId(req.params.bankAtmCardId)
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
}
