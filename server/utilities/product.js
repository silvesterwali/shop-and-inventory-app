const ObjectID = require('mongodb').ObjectID
const db = require('../db').db

/**
 * findProduct
 *
 * - method will responsible to take specific resource of product from storage
 * @param {String} productId
 * @async
 */
exports.findProduct = async (productId) => {
  try {
    const product = await db
      .collection('products')
      .findOne({ _id: new ObjectID(productId) })
    return product
  } catch (err) {
    throw new Error(err)
  }
}
