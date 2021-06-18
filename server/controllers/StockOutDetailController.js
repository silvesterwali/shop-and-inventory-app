/* eslint-disable no-console */
/**
 * @copyright 2021
 *
 *
 **/
const ObjectID = require('mongodb').ObjectID
const db = require('../db').db
const { countDiscount } = require('../utilities/discountUtils')

/**
 *=====================================
 * index
 *
 * - get listing of resources
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @async
 **/
exports.index = (req, res) => {}

/**
 *=====================================
 * store
 *
 * - store new resource to storage
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @async
 **/
exports.store = async (req, res) => {
  const { productId, qty, unit, price, discount, description } = req.boy
  const productObjectID = new ObjectID(productId)
  try {
    await db.collection('stockOutTransactions').findOneAndUpdate(
      {
        _id: new ObjectID(req.params.stockOutId),
      },
      {
        $push: {
          productsInTransactions: {
            _id: new ObjectID(),
            productId: productObjectID,
            qty: parseInt(qty),
            unit,
            price: parseFloat(price),
            discount: parseFloat(discount),
            total: countDiscount(price, qty, discount),
            description,
            createdAt: new Date(),
          },
        },
      }
    )
    return res.json({ message: 'Success adding item' })
  } catch (err) {
    console.console.log()
  }
}

/**
 *=====================================
 * update
 *
 *
 * - update the specific resource
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @async
 **/
exports.update = async (req, res) => {
  const { productId, qty, unit, price, discount, description } = req.boy
  const productObjectID = new ObjectID(productId)
  try {
    await db.collection('stockOutTransactions').updateOne(
      {
        _id: new ObjectID(req.params.stockOutId),
        'productsInTransactions._id': new ObjectID(req.params.id),
      },
      {
        $set: {
          'productsInTransactions.$.productId': productObjectID,
          'productsInTransactions.$.qty': parseInt(qty),
          'productsInTransactions.$.unit': unit,
          'productsInTransactions.$.price': parseFloat(price),
          'productsInTransactions.$.discount': parseFloat(discount),
          'productsInTransactions.$.total': countDiscount(price, qty, discount),
          'productsInTransactions.$.description': description,
          'productsInTransactions.$.updatedAt': new Date(),
        },
      }
    )
    return res.json({ message: 'Success create item' })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

/**
 *=====================================
 * destroy
 *
 * - destroy specific resource from storage
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @async
 **/
exports.destroy = async (req, res) => {
  const StockOutId = new ObjectID(req.params.stockOutId)
  const transactionId = new ObjectID(req.params.id)
  try {
    await db.collection('stockOutTransactions').findOne(
      {
        _id: StockOutId,
        'productsInTransaction._id': transactionId,
      },
      {
        $pull: {
          productsInTransactions: {
            _id: transactionId,
          },
        },
      }
    )
    return res.json({ message: 'Success to remove items' })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
