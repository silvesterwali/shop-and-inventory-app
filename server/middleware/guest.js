const guest = (req, res, next) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.replace('Bearer ', '')
  if (token) return res.status(400).send('Guest only')
  next()
}

module.exports = guest
