/* eslint-disable no-console */
const ObjectId = require('mongodb').ObjectID
const db = require('../db').db
const { totalPages } = require('../utilities/totalPagesUtils')
/**
 * getUser
 *
 * - get users resource from database
 * - return is provide as pagination result
 * - later with perform query with some condition
 * - by default will perform limit for pagination is 50 and page 1
 *
 * @param {express.Request} req
 * @param {express.Response} res
 *
 **/
exports.getUsers = async (req, res) => {
  /**
   * apply for paginate pagination
   *
   **/

  const limit = req.query.limit ? parseInt(req.query.limit) : 50
  const page = req.query.page ? parseInt(req.query.page) : 1

  const startIndex = (page - 1) * limit
  const endIndex = page * limit

  const result = {}

  const query = {} // to apply if client send another parameter

  try {
    result.totalRows = await db.collection('users').find(query).count()
    result.totalPages = totalPages(result.totalRows, limit)
    if (endIndex < result.totalRows) {
      result.next = {
        page: page + 1,
        limit,
      }
    }
    if (startIndex > 0) {
      result.previous = {
        page: page - 1,
        limit,
      }
    }
    result.data = await db
      .collection('users')
      .find(query, { projection: { password: 0 } })
      .skip(startIndex)
      .limit(limit)
      .toArray()

    // response
    return res.json(result)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)

    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

/**
 * userDetails
 *
 * - get detail information about user and personal data
 * @param {express.Request} req
 * @param {express.Response} res
 **/
exports.userDetails = async (req, res) => {
  const userId = new ObjectId(req.params.userId)
  try {
    const user = await db
      .collection('users')
      .findOne({ _id: userId }, { projection: { password: 0 } })

    // after find user object the select personal data to
    user.personal = await db.collection('personal').findOne({ userId })
    return res.json(user)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal Server Errors' })
  }
}
