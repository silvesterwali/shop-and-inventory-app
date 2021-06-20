/* eslint-disable no-console */
/**
 * @copyright 2021
 *
 *
 **/

const ObjectID = require('mongodb').ObjectID
const db = require('../db').db
const stockNumber = require('../utilities/stockNumberUtils.js')

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
  const limit = req.params.limit ? parseInt(req.params.limit) : 50
  const page = req.params.page ? parseInt(req.params.page) : 1
  const startIndex = (page - 1) * limit
  const endIndex = page * limit

  const result = {}
  const query = {}
  try {
    // count all document with same parameter before load to client
    result.totalRows = await db
      .collection('stockOutTransactions')
      .find(query)
      .count()
    if (endIndex < result.totalRows) {
      result.next = {
        page: page - 1,
        limit,
      }
    }
    // apply the previous
    if (startIndex > 0) {
      result.previous = {
        page: page + 1,
        limit,
      }
    }
    // take document with aggregation
    result.data = await db
      .collection('stockOutTransactions')
      .aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'createdBy',
            foreignField: '_id',
            as: 'createdBy',
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'updatedBy',
            foreignField: '_id',
            as: 'updatedBy',
          },
        },
        {
          // convert array of supplier to object if exist
          $unwind: {
            path: '$updatedBy',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          // convert array of createBy to object if exists
          $unwind: {
            path: '$createdBy',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          // exclude some field  from return result to client
          $project: {
            'createdBy.password': 0,
            'createdBy.verifiedEmail': 0,
            'createdBy.created_at': 0,
            'createdBy.updated_at': 0,
            'updatedBy.password': 0,
            'updatedBy.verifiedEmail': 0,
            'updatedBy.created_at': 0,
            'updatedBy.updated_at': 0,
            productsInTransactions: 0,
          },
        },
        {
          // take limit for every query
          $limit: limit,
        },
        {
          // skip the index of document
          $skip: startIndex,
        },
      ])
      .toArray()
    return res.json(result)
  } catch (err) {
    // eslint-disable-next-line no-console
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
  const { type, description, transactionDate } = req.body

  try {
    const result = await db.collection('stockOutTransactions').insertOne({
      _id: new ObjectID(),
      serialNumber: await stockNumber.stockOutTransactionNumber(),
      transactionDate,
      description,
      type, // to define the type of stock out transaction [production ,return]
      status: 0, // user pending,
      createdBy: new ObjectID(req.user._id),
      createdAt: new Date(),
      productsInTransactions: [],
    })
    return res.json({
      message: 'Success create new stock out transaction',
      data: result.ops[0],
    })
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
exports.show = async (req, res) => {
  const _id = new ObjectID(req.params.id)
  try {
    const stockOutTransactions = await db
      .collection('stockOutTransactions')
      .aggregate([
        {
          $match: {
            _id,
          },
        },
        {
          // join the user collection as createdBy
          $lookup: {
            from: 'users',
            localField: 'createdBy',
            foreignField: '_id',
            as: 'createdBy',
          },
        },
        {
          // join the user collection as updatedBy
          $lookup: {
            from: 'users',
            localField: 'updatedBy',
            foreignField: '_id',
            as: 'updatedBy',
          },
        },
        {
          // using unwind to take the object outside the array of user collection
          $unwind: {
            path: '$createdBy',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $unwind: {
            path: '$updatedBy',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            'createdBy.password': 0,
            'createdBy.verifiedEmail': 0,
            'createdBy.created_at': 0,
            'createdBy.updated_at': 0,
            'updatedBy.password': 0,
            'updatedBy.verifiedEmail': 0,
            'updatedBy.created_at': 0,
            'updatedBy.updated_at': 0,
            productsInTransactions: 0,
          },
        },
      ])
      .toArray()
    return res.json(stockOutTransactions[0])
  } catch (err) {}
}

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
  const { type, description, transactionDate } = req.body

  try {
    const stockOut = await db
      .collection('stockOutTransactions')
      .findOneAndUpdate(
        {
          _id: new ObjectID(req.params.id),
        },
        {
          $set: {
            transactionDate,
            description,
            type, // to define the type of stock out transaction [production ,return]
            updatedBy: new ObjectID(req.user._id),
            updatedAt: new Date(),
          },
        },
        {
          upsert: true,
        }
      )
    return res.json({
      message: 'Success update current stock out transaction',
      data: stockOut.value,
    })
  } catch (err) {
    console.log(err)
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
  try {
    await db.collection('stockOutTransactions').deleteOne({
      _id: new ObjectID(req.params.id),
    })
    return res.json({ message: 'Success remove current stock out transaction' })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
