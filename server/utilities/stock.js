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
        $inc: {
          stockQty: parseFloat(qty),
        },
      }
    )
    return true
  } catch (err) {
    throw new Error(err)
  }
}
/**
 *cancelIncomingStock
 *
 *
 * - this method will responsible update and set specific incoming stock  to cancelled status
 * @param {String} incomingStockId
 * @param {string} cancelNote
 * @param {Object} user - current login login
 *
 */
exports.cancelIncomingStock = async (incomingStockId, cancelNote, user) => {
  try {
    await db.collection('IncomingStocks').updateOne(
      {
        _id: new ObjectID(incomingStockId),
      },
      {
        $set: {
          status: 2, // cancel status
          cancelBy: new ObjectID(user._id),
          cancelNote,
          cancelAt: new Date(),
        },
      }
    )
    return true
  } catch (err) {
    throw new Error(err)
  }
}
