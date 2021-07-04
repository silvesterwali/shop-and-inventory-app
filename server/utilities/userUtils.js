/**
 * user utils
 *
 * - provide some utilities for `users` documents
 */

const db = require('../db').db
/**
 * countUser
 *
 * - count the `users` documents without any pipeline
 * @async
 * @return Number
 */
exports.countUser = async () => {
  try {
    return await db.collection('users').find({}).count()
  } catch (err) {
    throw new Error(err)
  }
}
