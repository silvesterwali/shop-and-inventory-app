/**
 * manage personal profile
 *
 * - this is just for current user only
 * - not suggest for other management like Human resource or admin
 */

const ObjectId = require('mongodb').ObjectID
const express = require('express')
const db = require('../db').db

const router = express.Router()

/**
 * retrieve user profile
 *
 * @param {any} user_id
 * @param {express.Request} req
 * @param {express.Response} res
 *
 */
router.get('/:user_id', async (req, res) => {
  try {
    const userId = new ObjectId(req.params.user_id)
    const profile = await db.collection('profile').findOne({ userId })
    return res.json(profile)
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server error' })
  }
})

/**
 * create user profile
 *
 * @param {express.Request} req
 * @param {express.Response} res
 *
 */
router.post('/', (req, res) => {})

/**
 * update user profile
 *
 *
 * @param {any} id
 * @param {express.Request} req
 * @param {express.Response} res
 *
 **/
router.put('/:id', (req, res) => {})

/**
 * delete user profile
 *
 * @param {any} id
 * @param {express.Request} req
 * @param {express.Response} res
 *
 */
router.delete('/:id', (req, res) => {})

module.exports = router
