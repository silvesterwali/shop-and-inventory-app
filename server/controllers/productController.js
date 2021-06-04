/**
 * controller to handler product document resource
 *
 *
 *
 **/

const ObjectID = require('mongodb').ObjectID
const db = require('../db').db

/**
 * getProducts
 *
 *
 * - get all product resource
 * @param {express.Request} req
 * @param {express.Response} res
 */
exports.getProducts = async (req, res) => {
  /**
   * apply for pagination
   *
   *
   */
  const limit = req.params.limit ? parseInt(req.params.limit) : 50
  const page = req.params.page ? parseInt(req.params.page) : 1

  const startIndex = (page - 1) * limit
  const endIndex = page * limit

  const result = {} // store result query for client
  const query = {}
  try {
    result.totalRows = await db.collection('products').find(query).count()
    // apply next pagination

    if (endIndex < result.totalRows) {
      result.next = {
        page: page - 1,
        limit,
      }
    }
    // will apply previous step
    if (startIndex > 0) {
      result.previous = {
        page: page + 1,
        limit,
      }
    }
    result.data = await db
      .collection('products')
      .find(query)
      .limit(limit)
      .skip(startIndex)
      .toArray()
    return res.json(result)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

/**
 * createProduct
 *
 *
 * create new product resource
 *
 * @param {express.Request} req
 * @param {express.Response} res
 *
 */
exports.createProduct = async (req, res) => {
  const {
    name,
    serial,
    category,
    unit,
    wholeSale,
    retailPrice,
    description,
    stockQty,
  } = req.body
  // eslint-disable-next-line no-console
  console.log(unit)
  try {
    await db.collection('products').insertOne(
      {
        name,
        serial,
        category,
        unit,
        wholeSale: parseFloat(wholeSale),
        retailPrice: parseFloat(retailPrice),
        description,
        stockQty: parseFloat(stockQty),
        createdBy: new ObjectID(req.user._id),
        createdAt: new Date(),
      },

      false,
      true
    )
    return res.json({ message: 'Success to add new product resource' })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

/**
 * getProduct
 *
 * - get specific product resource
 * @param {express.Request} req
 * @param {express.Response} res
 */
exports.getProduct = async (req, res) => {
  try {
    const product = await db
      .collection('products')
      .findOne({ _id: new ObjectID(req.params.productId) })
    return res.json(product)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

/**
 * updateProduct
 *
 * - update specific resource
 * @param {express.Request} req
 * @param {express.Response} res
 */
exports.updateProduct = async (req, res) => {
  const { name, serial, category, unit, wholeSale, retailPrice, description } =
    req.body
  try {
    await db.collection('products').updateOne(
      { _id: new ObjectID(req.params.productId) },
      {
        $set: {
          name,
          serial,
          category,
          unit,
          wholeSale: parseFloat(wholeSale),
          retailPrice: parseFloat(retailPrice),
          description,
          updatedBy: new ObjectID(req.user._id),
          updatedAt: new Date(),
        },
      },
      false,
      true
    )
    return res.json({ message: 'Success to update product resource' })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

/**
 * deleteProduct
 *
 * - delete specific product resource
 * - TODO: this feature is still evaluation for other document that have relation for resource
 * @param {express.Request} req
 * @param {express.Response} res
 */
exports.deleteProduct = async (req, res) => {
  try {
    await db.collection('products').deleteOne({
      _id: new ObjectID(req.params.productId),
    })
    return res.json({ message: 'Success delete product ' })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
