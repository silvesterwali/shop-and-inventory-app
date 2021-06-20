/**
 * @copyright 2021
 * - this controller is responsible for cancel any stock out transaction
 * - sometime the transaction can cancel in any status except already canceled before
 * - if the current transaction been approve before that's mean
 * - all product should increase the stock qty
 **/

const ObjectID = require('mongodb').ObjectID
const db = require('../db').db
const stockUtils = require('../utilities/stock.js')
const { productGroup } = require('../utilities/product.js')

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

    /**
     * prevent the transaction if does not exists in resource
     * so the process will stop here
     */
    if (!stockOut) {
      return res.status(404).json({ message: 'Data Not Found' })
    }

    const { productsInTransactions } = stockOut

    // prevent if the action is second time or already canceled before
    if (stockOut.status === 2) {
      return res
        .status(422)
        .json({ message: 'This actions cannot be execute, it wrong sections' })
    }

    const productTemp = await productGroup(productsInTransactions)

    const runLoopIncrease = async () => {
      for (const item of productTemp) {
        await stockUtils.incrementStockProduct(item.productId, item.qty)
      }
    }
    /**
     * - if the product already approve before
     * that mean the transaction already affected the product stock qty before
     * - that why we should increase them again
     */
    if (stockOut.status === 1) {
      await runLoopIncrease()
    }

    await db.collection('stockOutTransactions').findOneAndUpdate(
      { _id },
      {
        $set: {
          status: 2,
          cancelBy: new ObjectID(req.user._id),
          cancelNote: req.body.cancelNote,
        },
      }
    )
    return res.json({ message: 'Success to cancel current transaction' })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)
    return res.status(500).json({
      message: 'Internal Server Error',
    })
  }
}
