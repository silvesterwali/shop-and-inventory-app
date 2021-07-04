/**
 * provide some utilities for `branches` documents
 *
 *
 **/

const db = require('../db').db
/**
 * countBranches
 *
 * - count `branches` documents
 */
exports.countBranches = async () => {
  try {
    return await db.collection('branches').find({}).count()
  } catch (err) {
    throw new Error(err)
  }
}
