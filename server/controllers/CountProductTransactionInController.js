/**
 * @copyright 2021
 *
 *
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
 *
 * @see https://stackoverflow.com/a/68611742/12288929 - contoh query yang corensponding dengan masalah
 **/
exports.index = async (req, res) => {
  const startOfMonth =
    req.query.start_date === ''
      ? moment().startOf('month').format('YYYY-MM-DD')
      : req.query.start_date
  const endOfMonth =
    req.query.end_date === ''
      ? moment().endOf('month').format('YYYY-MM-DD')
      : req.query.end_date
  try {
    const productInTransaction = await db
      .collection('IncomingStocks')
      .aggregate([
        {
          // menyiapkan query untuk mengambil data pada bulan
          // yang diinginkan
          $match: {
            transactionDate: {
              $gte: stringToDateFormat(startOfMonth),
              $lte: stringToDateFormat(endOfMonth),
            },
            status: {
              $eq: 1,
            },
          },
        },
        // melakukan unwind pada array product in transaction
        // demi mempermudah untuk mengeluarkan data transaction dalam object
        {
          $unwind: {
            path: '$productsInTransactions',
          },
        },
        // melakukan group pada data object transaksi
        // disini kita akan melakukan grup hanya berdasarkan
        // productId dan qty dari productsInTransaction object
        {
          $group: {
            _id: '$productsInTransactions.productId',
            qty: {
              $sum: '$productsInTransactions.qty',
            },
            total: {
              $sum: '$productsInTransactions.total',
            },
          },
        },
        // melakukan join dari products collections
        {
          $lookup: {
            from: 'products',
            localField: '_id',
            foreignField: '_id',
            as: 'product',
          },
        },
        // melalukan projection untuk beberapa fieds sebelum dibalikan ke client
        {
          $unwind: '$product',
        },
        {
          $project: {
            serial: '$product.serial',
            name: '$product.name',
            stock_qty: '$product.stockQty',
            qty_in_transaction: '$qty',
            total: 1,
          },
        },
      ])
      .toArray()
    return res.json(productInTransaction)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
