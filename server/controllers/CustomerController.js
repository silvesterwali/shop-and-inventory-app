/* eslint-disable no-console */
/**
 * @copyright 2021
 *
 *
 **/
const ObjectID = require('mongodb').ObjectID
const db = require('../db').db
const {
  customerSerialNumberGenerate,
} = require('../utilities/customerNumberUtils')

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
    const customers = await db.collection('customers').find({}).toArray()
    return res.json(customers)
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
  const { fullName, email, phone, phoneAlternate, address, addressAlternate } =
    req.body
  try {
    await db.collection('customers').insertOne({
      serialNumber: await customerSerialNumberGenerate(),
      fullName,
      email,
      phone,
      phoneAlternate,
      address,
      addressAlternate,
      createdBy: new ObjectID(req.user_id),
      createdAt: new Date(),
    })
    return res.json({ message: 'Success create new customer' })
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
    const costumer = await db
      .collection('customers')
      .findOne({ _id: new ObjectID(req.params.id) })
    return res.json(costumer)
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
  const { fullName, email, phone, phoneAlternate, address, addressAlternate } =
    req.body
  try {
    await db.collection('customers').findOneAndUpdate(
      {
        _id: new ObjectID(req.params.id),
      },
      {
        $set: {
          fullName,
          email,
          phone,
          phoneAlternate,
          address,
          addressAlternate,
          updatedBy: new ObjectID(req.user._id),
          updatedAt: new Date(),
        },
      }
    )
    return res.json({ message: 'Success update specific resource' })
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
      .collection('customers')
      .deleteOne({ _id: new ObjectID(req.params.id) })
    return res.json({ message: 'Success remove specific resource' })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
