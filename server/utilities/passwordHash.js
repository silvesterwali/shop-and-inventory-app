const crypto = require('crypto')
function passwordHash(password) {
  const salt = crypto.randomBytes(16).toString('hex')
  return crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`)
}

module.exports = { passwordHash }
