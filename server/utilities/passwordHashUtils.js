const bycrypt = require('bcryptjs')
async function passwordHash(password) {
  const salt = await bycrypt.genSalt(10)

  return await bycrypt.hash(password, salt)
}

module.exports = { passwordHash }
