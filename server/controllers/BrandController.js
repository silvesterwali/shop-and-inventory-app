/* eslint-disable no-console */
/**
 * @copyright 2021
 *
 * - controller to responsible to create brand for product
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
    const brands = await db.collection('brands').find({}).toArray()
    return res.json(brands)
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
  const { title, summary, content } = req.body
  try {
    await db.collection('brands').insertOne({
      title,
      summary,
      content,
      createdAt: new Date(),
    })
    return res.json({ message: 'Success to create resource' })
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
    const brand = await db
      .collection('brands')
      .findOne({ _id: new ObjectID(req.params.id) })
    return res.json(brand)
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
  const { title, summary, content } = req.body
  try {
    await db.collection('brands').findOneAndUpdate(
      {
        _id: new ObjectID(req.params.id),
      },
      {
        $set: {
          title,
          summary,
          content,
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
      .collection('brands')
      .deleteOne({ _id: new ObjectID(req.params.id) })
    return res.json({ message: 'Success to remove specific resource' })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
