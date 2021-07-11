/* eslint-disable no-console */
const ObjectID = require('mongodb').ObjectID
const db = require('../db').db
const { passwordHash } = require('../utilities/passwordHashUtils')
const { totalPages } = require('../utilities/totalPagesUtils')
/**
 * index
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
exports.index = async (req, res) => {
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
 * show
 *
 * - get detail information about user and personal data
 * @param {express.Request} req
 * @param {express.Response} res
 **/
exports.show = async (req, res) => {
  const userId = new ObjectID(req.params.id)
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

/**
 *=====================================
 * store
 *
 *
 * - store the specific resource
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @async
 **/
exports.store = async (req, res) => {
  try {
    const result = await db.collection('users').insertOne({
      _id: new ObjectID(),
      username: req.body.username,
      email: req.body.email,
      password: await passwordHash(req.body.password),
      rules: req.body.rules,
      verifiedEmail: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    const { _id, username, email, rules, createdAt, updatedAt } = result.ops[0]
    return res.json({
      message: 'Success to register user',
      data: {
        _id,
        username,
        email,
        rules,
        createdAt,
        updatedAt,
      },
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
