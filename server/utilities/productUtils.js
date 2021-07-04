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
/**
 * productGroup
 *
 * - will group all product according `productId` then sum all the `qty` with same `productId`
 *
 * @param {Array} productArray
 *
 */
exports.productGroup = (productArray) => {
  if (!Array.isArray(productArray)) {
    return []
  }
  const products = []
  productArray.forEach(function (el) {
    if (!this[el.productId] && !this[el.qty]) {
      this[el.productId] = { productId: el.productId, qty: 0 }
      products.push(this[el.productId])
    }
    this[el.productId].qty += el.qty
  }, Object.create({}))
  return products
}
/**
 * productCount
 *
 * - count products document without any pipeline
 */
exports.productCount = async () => {
  try {
    const totalProduct = await db.collection('products').find({}).count()
    return totalProduct
  } catch (error) {
    throw new Error(error)
  }
}
