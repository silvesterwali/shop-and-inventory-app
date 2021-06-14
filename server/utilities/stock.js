const ObjectID = require('mongodb').ObjectID
const db = require('../db').db
/**
 * incrementStockProduct
 *
 *
 * - this method will responsible to increase a product stock
 * @param {String} productId
 * @param {Number} qty
 * @async
 */
exports.incrementStockProduct = async (productId, qty) => {
  try {
    await db.collection('products').updateOne(
      { _id: new ObjectID(productId) },
      {
        $set: {
          $inc: {
            stockQty: parseFloat(qty),
          },
        },
      }
    )
    return true
  } catch (err) {
    throw new Error(err)
  }
}
