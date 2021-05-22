const jwt = require('jsonwebtoken')
const db = require('../db').db
const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.replace('Bearer ', '')
  if (!token) return res.status(401).send('Access denied')
  try {
    const Verified = jwt.verify(token, process.env.TOKEN)
    const user = await db.collection('user').findOne({ _id: Verified.id })
    req.user = {
      _id: user._id,
      email: user.email,
      rules: user.roles,
    }
    next()
  } catch (error) {
    return res.status(400).send('Access is not Authorization')
  }
}

module.exports = auth
