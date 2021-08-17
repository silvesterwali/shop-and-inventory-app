/**
 * @copyright 2021
 *
 *
 **/
const ObjectID = require('mongodb').ObjectID
const db = require('../db').db
const currentDateFormat =
  require('../utilities/timeFormatUtils').currentDateFormat
const QueryPageUtils = require('../utilities/QueryPageUtils').QueryPageUtils
const totalPages = require('../utilities/totalPagesUtils').totalPages
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
  const { limit, page, startIndex, endIndex } = QueryPageUtils(req.query)
  const status = req.query.status
  const result = {}
  const query = { userId: new ObjectID(req.user._id), status }
  try {
    result.totalRows = await db.collection('todos').find(query).count()
    result.totalPages = totalPages(result.totalRows, limit)
    if (endIndex < result.totalRows) {
      result.next = {
        page: page - 1,
        limit,
      }
    }
    if (startIndex > 0) {
      result.provious = {
        page: page + 1,
        limit,
      }
    }
    result.data = await db
      .collection('todos')
      .aggregate([
        {
          $match: {
            userId: {
              $eq: new ObjectID(req.user._id),
            },
            status: {
              $eq: status,
            },
          },
        },
        {
          $skip: startIndex,
        },
        {
          $limit: limit,
        },
      ])
      .toArray()
    return res.json(result)
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
  const { description, status } = req.body
  try {
    await db.collection('todos').insertOne({
      description,
      userId: new ObjectID(req.user._id),
      status, // [in progress,plan,done,cancel]
      createdAt: currentDateFormat(),
      updatedAt: currentDateFormat(),
    })
    return res.json({ message: 'Success adding todo' })
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
  try {
    const todo = await db
      .collection('todos')
      .findOne({ _id: new ObjectID(req.params.id) })
    return res.json(todo)
  } catch (err) {
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
  const { description, status } = req.body
  try {
    await db.collection('todos').updateOne(
      {
        _id: new ObjectID(req.params.id),
      },
      {
        $set: {
          description,
          status,
          updatedAt: currentDateFormat(),
        },
      }
    )
    return res.json({ message: 'Success update todo' })
  } catch (err) {
    console.log(err)
    return res.json({ message: 'Internal Server Error' })
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
    await db.collection('todos').deleteOne({ _id: new ObjectID(req.params.id) })
    return res.json({ message: 'Success delete todo' })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
