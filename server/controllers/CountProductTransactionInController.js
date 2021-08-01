/**
 * @copyright 2021
 *
 *
 **/

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
 *
 * @see https://stackoverflow.com/a/68611742/12288929 - contoh query yang corensponding dengan masalah
 **/
exports.index = async (req, res) => {
  try {
    const productInTransaction = await db
      .collection('IncomingStocks')
      .aggregate([
        {
          // menyiapkan query untuk mengambil data pada bulan
          // yang diinginkan
          $match: {
            transactionDate: {
              $gte: new Date('Thu, 01 Jul 2021 00:00:00 GMT'),
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
          },
        },
        // melakukan join dari products collections
        {
          $lookup: {
            from: 'products',
            localField: '_id',
            foreignField: '_id',
            as: 'data',
          },
        },
        // melalukan projection untuk beberapa fieds sebelum dibalikan ke client
        {
          $project: {
            name: {
              $arrayElemAt: ['$data.name', 0],
            },
            retailPrice: {
              $arrayElemAt: ['$data.retailPrice', 0],
            },
            qtyInTransaction: '$qty',
          },
        },
      ])
    return res.json(productInTransaction)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
