/* eslint-disable no-console */
/**
 * @copyright 2021
 *
 *
 **/

const ObjectId = require('mongodb').ObjectID
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
    const suppliers = await db.collection('suppliers').find({}).toArray()
    return res.json(suppliers)
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
  const { name, phone, email, address } = req.body
  try {
    await db.collection('suppliers').insertOne({
      name,
      phone,
      email,
      address,
      isActive: true,
      createdAt: new Date(),
    })
    return res.json({ message: 'Success create supplier' })
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
    const supplier = await db
      .collection('suppliers')
      .findOne({ _id: new ObjectId(req.params.id) })
    return res.json(supplier)
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
  const { name, phone, email, address } = req.body

  try {
    await db.collection('suppliers').updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $set: {
          name,
          phone,
          email,
          address,
          updatedAt: new Date(),
        },
      }
    )
    return res.json({ message: 'Success update supplier' })
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
      .collection('suppliers')
      .deleteOne({ _id: new ObjectId(req.params.id) })
    return res.json({ message: 'Success delete supplier' })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal Serve Error' })
  }
}
