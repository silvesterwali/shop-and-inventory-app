/* eslint-disable no-console */
/**
 * @copyright 2021
 *
 *
 **/

const ObjectID = require('mongodb').ObjectID
const db = require('../db').db
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
exports.index = async (req, res) => {
  const StockInId = req.params.StockInId
    ? new ObjectID(req.params.StockInId)
    : null
  try {
    const stock = await db
      .collection('IncomingStocks')
      .findOne({ _id: StockInId })

    const productsInTransactions = stock ? stock.productsInTransactions : []
    return res.json(productsInTransactions)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

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
  const { productId, qty, description, unit, price, discount } = req.body
  const productObjectID = productId ? new ObjectID(productId) : null
  try {
    await db.collection('IncomingStocks').findOneAndUpdate(
      {
        _id: new ObjectID(req.params.StockInId),
      },
      {
        $push: {
          productsInTransactions: {
            _id: new ObjectID(),
            productId: productObjectID,
            qty,
            unit,
            price,
            discount,
            description,
            isCancel: false,
            createdAt: new Date(),
          },
        },
      }
    )
    return res.json({ message: 'Success add item ' })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

/**
 *=====================================
 * show
 *
 * - show the specific of resource from storage
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @async
 **/
exports.show = async (req, res) => {}

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
  const { productId, qty, description, unit, price, discount } = req.body
  const productObjectID = productId ? new ObjectID(productId) : null
  try {
    await db.collection('IncomingStocks').updateOne(
      {
        _id: new ObjectID(req.params.StockInId),
        'productsInTransactions._id': new ObjectID(req.params.id),
      },
      {
        // update the current selected object form array product in transaction
        $set: {
          'productsInTransactions.$.productId': productObjectID,
          'productsInTransactions.$.qty': qty,
          'productsInTransactions.$.unit': unit,
          'productsInTransactions.$.price': price,
          'productsInTransactions.$.discount': discount,
          'productsInTransactions.$.description': description,
          'productsInTransactions.$.updatedAt': new Date(),
        },
      }
    )
    return res.json({ message: 'Success update item' })
  } catch (err) {
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
  const StockInId = new ObjectID(req.params.StockInId)
  const transactionId = new ObjectID(req.params.id)
  try {
    await db.collection('IncomingStocks').updateOne(
      {
        _id: StockInId,
        'productsInTransactions._id': transactionId,
      },
      {
        $pull: {
          productsInTransactions: {
            _id: transactionId,
          },
        },
      }
    )
  } catch (err) {}
}
