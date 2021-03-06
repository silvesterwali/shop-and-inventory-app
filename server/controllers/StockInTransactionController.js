/**
 * @copyright 2021
 *
 *
 **/

const ObjectID = require('mongodb').ObjectID
const StockNumber = require('../utilities/stockNumberUtils.js')
const db = require('../db').db
const { totalPages } = require('../utilities/totalPagesUtils')

const timeFormatUtils = require('../utilities/timeFormatUtils')

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
  const limit = req.query.limit ? parseInt(req.query.limit) : 50
  const page = req.query.page ? parseInt(req.query.page) : 1

  const startIndex = (page - 1) * limit
  const endIndex = page * limit

  const result = {}
  const query = {}
  try {
    // count all document with same parameter before load to client
    result.totalRows = await db.collection('IncomingStocks').find(query).count()

    result.totalPages = totalPages(result.totalRows, limit)

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
      .collection('IncomingStocks')
      .aggregate([
        {
          $lookup: {
            from: 'suppliers',
            localField: 'supplierId',
            foreignField: '_id',
            as: 'supplier',
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'createdBy',
            foreignField: '_id',
            as: 'createdBy',
          },
        },
        {
          // convert array of supplier to object if exist
          $unwind: {
            path: '$supplier',
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
            'supplier.createdAt': 0,
            'supplier.updatedAt': 0,
          },
        },

        {
          $addFields: {
            grand_total: {
              $sum: '$productsInTransactions.total',
            },
          },
        },

        {
          // skip the index of document
          $skip: startIndex,
        },
        {
          // take limit for every query
          $limit: limit,
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
  const { description, supplierId, transactionDate, transactionType } = req.body
  const supplierID =
    req.body.supplier !== null ? new ObjectID(supplierId) : null
  try {
    const result = await db.collection('IncomingStocks').insertOne({
      _id: new ObjectID(),
      serialNumber: await StockNumber.stockInNumber(),
      transactionDate: timeFormatUtils.stringToDateFormat(transactionDate),
      supplierId: supplierID,
      // transaction type [retur,non return]
      transactionType,
      description,
      status: 0, // recent create
      createdBy: new ObjectID(req.user._id),
      createdAt: new Date(),
      // will contain all detail transation
      productsInTransactions: [],
    })

    return res.json({
      message: 'Success create header stock',
      data: result.ops[0],
    })
  } catch (err) {
    // eslint-disable-next-line no-console
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
    const IncomingStock = await db
      .collection('IncomingStocks')
      .aggregate([
        {
          $match: {
            _id,
          },
        },
        {
          $lookup: {
            from: 'suppliers',
            localField: 'supplierId',
            foreignField: '_id',
            as: 'supplier',
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'createdBy',
            foreignField: '_id',
            as: 'createdBy',
          },
        },
        {
          // convert array of supplier to object if exist
          $unwind: {
            path: '$supplier',
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
            'supplier.createdAt': 0,
            'supplier.updatedAt': 0,
            productsInTransactions: 0,
          },
        },
      ])
      .toArray()
    return res.json(IncomingStock[0])
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
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
  const { description, supplierId, transactionDate, transactionType } = req.body
  const supplierID = req.body.supplier ? new ObjectID(supplierId) : null
  try {
    const IncomingStock = await db
      .collection('IncomingStocks')
      .findOneAndUpdate(
        {
          _id: new ObjectID(req.params.id),
        },
        {
          $set: {
            transactionDate:
              timeFormatUtils.stringToDateFormat(transactionDate),
            supplierId: supplierID,
            // transation type [return,non retur]
            transactionType,
            description,
            updatedBy: new ObjectID(req.user._id),
            updatedAt: new Date(),
          },
        },
        {
          upsert: true,
        }
      )
    return res.json({
      message: 'Success To Update Stock',
      data: IncomingStock.value,
    })
  } catch (err) {
    // eslint-disable-next-line no-console
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
    await db
      .collection('IncomingStocks')
      .deleteOne({ _id: new ObjectID(req.params.id) })
    return res.json({ message: 'Success remove resource' })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
