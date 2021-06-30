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
  try {
    const branch = await db.collection('branches').find({}).toArray()
    return res.json(branch)
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
  const { name, code, phone, address, isActive } = req.body
  try {
    await db.collection('branch').insertOne({
      name,
      code,
      phone,
      address,
      isActive,
      createdAt: new Date(),
    })
    return res.json({ message: 'Success to create branch' })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal Server error' })
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
    const branch = await db
      .collection('branches')
      .findOne({ _id: new ObjectID(req.params.id) })
    return res.json(branch)
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
  const { name, code, phone, address, isActive } = req.body
  try {
    await db.collection('branches').updateOne(
      { _id: new ObjectID(req.params.id) },
      {
        name,
        code,
        phone,
        address,
        isActive,
      }
    )
    return res.json({ message: 'Success update branch' })
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
      .collection('branches')
      .deleteOne({ _id: new ObjectID(req.params.id) })
    return res.json({ message: 'Success delete specific branch' })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
