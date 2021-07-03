/**
 * @copyright 2021
 *
 *
 **/

const ObjectID = require('mongodb').ObjectID
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
  const limit = req.query.limit ? parseInt(req.query.limit) : 50
  const page = req.query.page ? parseInt(req.params.page) : 1

  const startIndex = (page - 1) * limit
  const endIndex = page * limit

  const result = {} // store result query for client
  const query = {}
  try {
    result.totalRows = await db.collection('feedbacks').find(query).count()

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
      .collection('feedbacks')
      .find(query)
      .skip(startIndex)
      .limit(limit)
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
  const { title, email, url, content } = req.body
  try {
    await db.collection('feedbacks').insertOne({
      title,
      email,
      url,
      content,
      status: 'Request',
      createdAt: new Date(),
    })
    return res.json({ message: 'Thank for your feedback' })
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
    const feedback = await db
      .collection('feedbacks')
      .findOne({ _id: new ObjectID(req.params.id) })
    return res.json(feedback)
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
  const { title, email, url, content, status } = req.body
  try {
    await db.collection('feedbacks').updateOne(
      { _id: new ObjectID(req.params.id) },
      {
        $set: {
          title,
          email,
          url,
          content,
          status,
        },
      }
    )
    return res.json({ message: 'Success update specific feedback' })
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
    await db
      .collection('feedbacks')
      .deleteOne({ _id: new ObjectID(req.params.id) })
    return res.json({ message: 'Success to remove specific feedback' })
  } catch (err) {
    console.log(err)

    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
