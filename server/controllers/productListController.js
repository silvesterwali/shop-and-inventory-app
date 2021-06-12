/* eslint-disable no-console */
/**
 * @copyright 2021
 * - this controller is responsible for get all product list without pagination section
 * - the controller is still under evaluation for better result
 **/

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
  try {
    const products = await db
      .collection('products')
      .find({})
      .sort({ name: -1 })
      .toArray()
    return res.json(products)
  } catch (err) {
    console.log(err)
    return res.status().json({ message: 'Internal Server Error' })
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
exports.store = (req, res) => {}

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
exports.show = (req, res) => {}

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
exports.update = (req, res) => {}

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
exports.destroy = (req, res) => {}
