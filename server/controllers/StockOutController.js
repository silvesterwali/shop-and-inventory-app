/* eslint-disable no-console */
/**
 * @copyright 2021
 *
 *
 **/

const ObjectID = require('mongodb').ObjectID
const db = require('../db').db
const stockNumber = require('../utilities/stockNumber.js')

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
exports.index = async (req, res) => {}

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
  const { type, description, transactionDate } = req.body

  try {
    const result = await db.collection('stockOutTransactions').insertOne({
      _id: new ObjectID(),
      serialNumber: await stockNumber.stockOutTransactionNumber(),
      transactionDate,
      description,
      type, // to define the type of stock out transaction [production ,return]
      status: 0, // user pending,
      createdBy: new ObjectID(req.user._id),
      createdAt: new Date(),
      productsInTransactions: [],
    })
    return res.json({
      message: 'Success create new stock out transaction',
      result: result.ops[0],
    })
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
exports.show = (req, res) => {}

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
  const { type, description, transactionDate } = req.body

  try {
    const result = await db.collection('stockOutTransactions').updateOne(
      {
        _id: new ObjectID(req.params.id),
      },
      {
        $set: {
          transactionDate,
          description,
          type, // to define the type of stock out transaction [production ,return]
          status: 0, // user pending,
          updatedBy: new ObjectID(req.user._id),
          updatedAt: new Date(),
        },
      }
    )
    return res.json({
      message: 'Success update current stock out transaction',
      result: result.ops[0],
    })
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
exports.destroy = (req, res) => {}
