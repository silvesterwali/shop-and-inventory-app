/* eslint-disable no-console */
const db = require('../db').db
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

  const limit = req.params.limit ? parseInt(req.params.limit) : 50
  const page = req.params.page ? parseInt(req.params.page) : 1

  const startIndex = (page - 1) * limit
  const endIndex = page * limit

  const result = {}

  const query = {} // to apply if client send another parameter

  try {
    result.totalRows = await db.collection('users').find(query).count()

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
      .limit(limit)
      .skip(startIndex)
      .toArray()

    // response
    return res.json(result)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)

    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
