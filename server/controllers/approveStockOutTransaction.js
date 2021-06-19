/**
 * @copyright 2021
 * - this controller is responsible to reduce the product according the
 * stock out transaction
 * - this only handle approver from the stock out transaction approve
 * - before to reduce the stock of every product it will some basic validate
 * to make that every product have enough stock qty before
 * - if the product does not  meet the requirement will impact for whole transaction to canceled
 **/

const ObjectID = require('mongodb').ObjectID
const db = require('../db').db

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
  const _id = new ObjectID(req.params.id)
  try {
    const stockOut = await db
      .collection('stockOutTransactions')
      .findOne({ _id })

    // prevent next operation if the resource does not exists

    if (!stockOut) {
      return res.status(404).json({ message: 'Data Not Found' })
    }

    const { productsInTransactions } = stockOut

    /**
     * prevent the current transaction is not on right session
     * or the product in transaction does not meet requirement to reduce the product stock
     */
    if (stockOut.status !== 0 || productsInTransactions.length <= 0) {
      return res.status(422).json({
        message:
          'This transaction cannot be process. The transaction does not meet the requirement ',
      })
    }

    const groupProductInTransaction = []
    /**
     * is a transaction maybe we have same product item
     * in this case we must group all product according the their _id
     * and then take the total of the product qty
     *
     */
    productsInTransactions.forEach(function (el) {
      // we will check if there product exists before on `groupProductInTransaction`
      if (!this[el.productId] && !this[el.qty]) {
        this[el.productId] = { productId: el.productId, qty: 0 }
        groupProductInTransaction.push(this[el.productId])
      }
      this[el.productId].qty += el.qty // this increase the product qty in groupProductInTransaction
    }, Object.create({}))
  } catch (error) {}
}
