const jwt = require('jsonwebtoken')
const ObjectId = require('mongodb').ObjectId
const db = require('../db').db
const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.replace('Bearer ', '')
  if (!token) return res.status(401).send('Access denied')
  try {
    const Verified = jwt.verify(token, process.env.TOKEN)

    if (!Verified)
      return res.status(403).message({
        message: 'Unauthorization',
      })
    const _id = new ObjectId(Verified.id)
    const user = await db.collection('users').findOne({ _id })

    req.user = {
      _id: user._id,
      email: user.email,
      rules: user.rules,
    }
    next()
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
    return res.status(400).send('Access is not Authorization')
  }
}

module.exports = auth