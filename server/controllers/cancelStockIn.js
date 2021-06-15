/**
 * @copyright 2021
 * guideline
 *
 * - every item in incoming stock can be cancel any time
 * but before it can canceled there rule to do that.
 * every product in transaction should be check if the product stock greater then
 * the quantity of item in the transaction before reduce it. if the quantity in current transaction
 * is greater then product quantity  it must manual to change. system will automatically reject it
 * - if the status is not equal with 0 (user pending) , the validation should apply the terms above
 * otherwise can be passed
 *
 **/

const ObjectID = require('mongodb').ObjectID
const db = require('../db').db
const stockUtils = require('../utilities/stock.js')
const { findProduct } = require('../utilities/product.js')

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
  try {
    const stock = await db
      .collection('IncomingStocks')
      .findOne({ _id: new ObjectID(req.params.id) })

    // prevent if stock does not exists on storage
    if (!stock) {
      return res.status(404).json({ message: 'Data not found' })
    }

    const { productsInTransactions } = stock

    if (stock.status === 0 || productsInTransactions.length <= 0) {
      /**
       * in this conditions that the current incoming is not effected the product stock before
       * so , we can direct cancel
       */
      await stockUtils.cancelIncomingStock(
        req.params.id,
        req.body.cancelNote,
        req.user
      )
      return res.json({ message: 'Success cancel specific incoming stock' })
    }

    const validStock = []
    // the result of product in transaction have to group by product
    productsInTransactions.forEach(function (el) {
      if (!this[el.productId] && !this[el.qty]) {
        /**
         * if there no product id before in validStock, The logic below will make them group
         * and increment to by the qty
         */
        this[el.productId] = { productId: el.productId, qty: 0 }
        validStock.push(this[el.productId])
      }
      // this code will do increment the stock
      this[el.productId].qty += el.qty
    }, Object.create({}))

    // validCount for store temp data
    const validCount = []

    validStock.forEach(async (el) => {
      const product = await findProduct(el.productId)
      if (product.stockQty >= el.qty) {
        validCount.push(1)
      }
    })
    /**
     * if when canceled the the transaction and stock qty is less the the qty of transaction
     * and in this condition should manually by admin IT
     */
    if (validStock.length !== validCount) {
      return res.status(422).json({
        message:
          'Some product qty in this current transaction is more then current stock qty. please do it manually with IT SUPPORT',
      })
    }

    validStock.forEach(async (el) => {
      /**
       * by passing negative value of qty that mean . we force mongodb `$inc` to reduce the quantity
       *
       */
      await stockUtils.incrementStockProduct(
        el.productId,
        Math.abs(el.qty) * -1
      )
    })

    return res.json({ message: 'success cancel item stock' })
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
