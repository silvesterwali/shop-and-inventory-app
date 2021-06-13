/* eslint-disable no-console */
/**
 * @copyright 2021
 *
 *
 **/

const ObjectID = require('mongodb').ObjectID
const db = require('../db').db
const { countDiscount } = require('../utilities/discountUtils.js')
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
  const StockInId = req.params.StockInId
    ? new ObjectID(req.params.StockInId)
    : null
  try {
    const stock = await db
      .collection('IncomingStocks')
      .aggregate(
        // this code below is pipeline for aggregate
        [
          {
            // first find the document match with _id
            $match: {
              _id: StockInId,
            },
          },
          {
            // unwind the productsInTransaction field from array to object
            $unwind: {
              path: '$productsInTransactions',
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            // join the product collection according the productId In productsInTransaction object field
            $lookup: {
              from: 'products',
              localField: 'productsInTransactions.productId',
              foreignField: '_id',
              as: 'productsInTransactions.product',
            },
          },
          {
            // adding new field to Object in productsInTransactions array
            $addFields: {
              'productsInTransactions.product': {
                $ifNull: [
                  {
                    // prevent if productId does not exits in productsInTransaction Array Object field
                    $arrayElemAt: ['$productsInTransactions.product', 0],
                  },
                  [],
                ],
              },
            },
          },
          {
            // group the all document to get the root order as like before add field
            $group: {
              _id: '$_id',
              serialNumber: {
                $first: '$serialNumber',
              },
              transactionDate: {
                $first: '$transactionDate',
              },
              supplierId: {
                $first: '$supplierId',
              },
              description: {
                $first: '$description',
              },
              status: {
                $first: '$status',
              },
              createdBy: {
                $first: '$createdBy',
              },
              createdAt: {
                $first: '$createdAt',
              },
              // this will pull the productsInTransactions to array format from object
              productsInTransactions: {
                $push: '$productsInTransactions',
              },
            },
          },
          {
            // exclude some field before return to client
            $project: {
              'productsInTransactions.product.updatedAt': 0,
              'productsInTransactions.product.updatedBy': 0,
              'productsInTransactions.product.createdAt': 0,
              'productsInTransactions.product.createdBy': 0,
              'productsInTransactions.product.category': 0,
              'productsInTransactions.product.unit': 0,
              'productsInTransactions.product.stockQty': 0,
            },
          },
        ]
      )
      .toArray()

    const productsInTransactions =
      stock.length > 0 ? stock[0].productsInTransactions : []
    return res.json(productsInTransactions)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

/**
 *=====================================
 * store
 *
 * - store new resource to storage
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @async
 **/
exports.store = async (req, res) => {
  const { productId, qty, description, unit, price, discount } = req.body
  const productObjectID = productId ? new ObjectID(productId) : null
  try {
    await db.collection('IncomingStocks').findOneAndUpdate(
      {
        _id: new ObjectID(req.params.StockInId),
      },
      {
        $push: {
          productsInTransactions: {
            _id: new ObjectID(),
            productId: productObjectID,
            qty: parseInt(qty),
            unit,
            price: parseFloat(price),
            discount: parseFloat(discount),
            total: countDiscount(price, qty, discount),
            description,
            isCancel: false,
            createdAt: new Date(),
          },
        },
      }
    )
    return res.json({ message: 'Success add item ' })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

/**
 *=====================================
 * show
 *
 * - show the specific of resource from storage
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @async
 **/
exports.show = async (req, res) => {}

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
  const { productId, qty, description, unit, price, discount } = req.body
  const productObjectID = productId ? new ObjectID(productId) : null
  try {
    await db.collection('IncomingStocks').updateOne(
      {
        _id: new ObjectID(req.params.StockInId),
        'productsInTransactions._id': new ObjectID(req.params.id),
      },
      {
        // update the current selected object form array product in transaction
        $set: {
          'productsInTransactions.$.productId': productObjectID,
          'productsInTransactions.$.qty': parseInt(qty),
          'productsInTransactions.$.unit': unit,
          'productsInTransactions.$.price': parseFloat(price),
          'productsInTransactions.$.discount': parseFloat(discount),
          'productsInTransactions.$.total': countDiscount(price, qty, discount),
          'productsInTransactions.$.description': description,
          'productsInTransactions.$.updatedAt': new Date(),
        },
      }
    )
    return res.json({ message: 'Success update item' })
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

/**
 *=====================================
 * destroy
 *
 * - destroy specific resource from storage
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @async
 **/
exports.destroy = async (req, res) => {
  const StockInId = new ObjectID(req.params.StockInId)
  const transactionId = new ObjectID(req.params.id)
  try {
    await db.collection('IncomingStocks').updateOne(
      {
        _id: StockInId,
        'productsInTransactions._id': transactionId,
      },
      {
        $pull: {
          productsInTransactions: {
            _id: transactionId,
          },
        },
      }
    )
    return res.json({ message: 'Success remove item' })
  } catch (err) {
    console.log(err)
    return res.status(500).message({ message: 'Internal Server Error' })
  }
}
