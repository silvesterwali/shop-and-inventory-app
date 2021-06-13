/* eslint-disable no-console */
/**
 * @copyright 2021
 * - this controller is just responsible to  increase in the total stock of goods
 * - this will work with incoming stock
 * - will change the status to 1 (status effect the qty stock of product)
 **/

const ObjectId = require('mongodb').ObjectID
const db = require('../db').db
const { incrementStockProduct } = require('../utilities/stok.js')

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
  /**
   * - 1 take incomingStock by _id
   * - 2 validate if the incomingStock has productsInTransaction item more then one
   *
   */

  try {
    const stock = await db
      .collection('IncomingStocks')
      .findOne({ _id: new ObjectId(req.params.id) })

    if (!stock) {
      return res.status(404).message({ message: 'Data not found' })
    }

    const { productsInTransactions } = stock

    if (productsInTransactions.length <= 0) {
      // prevent if product in transaction is empty
      return res.status(422).json({
        message: 'There no item product in transaction list. Operation failed',
      })
    }
    productsInTransactions.forEach(async (el) => {
      await incrementStockProduct(el.productId, el.qty)
    })

    await db.collection('IncomingStocks').updateMany(
      { _id: new ObjectId(req.params.id) },
      {
        $set: {
          status: 1,
        },
      }
    )
    res.json({
      message: 'Success adding stock',
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
