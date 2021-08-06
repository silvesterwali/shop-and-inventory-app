/**
 * @copyright 2021
 * - this controller is responsible for provide
 * product data in transaction in date selector
 * in transation out
 **/
const moment = require('moment')
const db = require('../db').db
const { stringToDateFormat } = require('../utilities/timeFormatUtils')
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
exports.index = async (_req, res) => {
  const startOfMonth = moment().startOf('month').format('YYYY-MM-DD')
  const endOfMonth = moment().endOf('month').format('YYYY-MM-DD')
  try {
    const products = await db
      .collection('stockOutTransactions')
      .aggregate([
        {
          // find the match criteria of query

          $match: {
            transactionDate: {
              $gte: stringToDateFormat(startOfMonth),
              $lte: stringToDateFormat(endOfMonth),
            },
            status: {
              $eq: 1, // 1 mean the transaction is valid
            },
          },
        },
        {
          // unwind the array of product transaction

          $unwind: {
            path: '$productsInTransactions',
          },
        },
        {
          // group and sum the qty of products in Transaction
          $group: {
            _id: '$productsInTransactions.productId',
            qty: {
              $sum: '$productsInTransactions.qty',
            },
          },
        },
        {
          $lookup: {
            from: 'products',
            localField: '_id',
            foreignField: '_id',
            as: 'product',
          },
        },
        {
          $unwind: {
            path: '$product',
          },
        },
        {
          $project: {
            _id: 1,
            qty: 1,
            'product.name': 1,
            'product.serial': 1,
            'product.stockQty': 1,
          },
        },
      ])
      .toArray()
    return res.json(products)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
