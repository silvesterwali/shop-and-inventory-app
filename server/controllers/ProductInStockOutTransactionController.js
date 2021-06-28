/**
 * @copyright 2021
 *
 * this controller is responsive to retrieve each product in stock out product
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
 **/
exports.index = async (req, res) => {
  // unwind the products in transactions array as object
  const unwindFirstStepPipeline = {
    $unwind: {
      path: '$productsInTransactions',
    },
  }
  // create new array from object and group the array in according productId
  const groupPipeline = {
    $group: {
      _id: '$productsInTransactions.productId',
      appear_in_transactions: {
        $sum: 1,
      },
      qty_in_transactions: {
        $sum: '$productsInTransactions.qty',
      },
      total_price_in_transactions: {
        $sum: '$productsInTransactions.total',
      },
    },
  }
  // join the products collections
  const lookupProductPipeline = {
    $lookup: {
      from: 'products',
      localField: '_id', // id product
      foreignKey: '_id',
      as: 'product',
    },
  }
  // unwind the product array to object
  const unwindProductPipeline = {
    $unwind: 'product',
  }
  // project some field before return final result
  const projectPipeline = {
    $project: {
      _id: 1,
      appear_in_transactions: 1,
      qty_in_transactions: 1,
      total_price_in_transactions: 1,
      'product.name': 1,
      'product.serial': 1,
    },
  }
  try {
    const product = await db
      .collection('stockOutTransactions')
      .aggregate([
        unwindFirstStepPipeline,
        groupPipeline,
        lookupProductPipeline,
        unwindProductPipeline,
        projectPipeline,
      ])
      .toArray()
    return res.json(product)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)
    return res.status(400).json({ message: 'Data Not Found' })
  }
}
