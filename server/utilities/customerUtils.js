/**
 * Customer utils
 *
 * - provide some utilities for `customers` documents
 */

const db = require('../db').db
/**
 * countCustomer
 *
 * - utilities for count `customers` documents without any pipeline
 * @async
 * @return Number
 */
exports.countCustomer = async () => {
  try {
    return await db.collection('customers').find().count()
  } catch (err) {
    throw new Error(err)
  }
}
