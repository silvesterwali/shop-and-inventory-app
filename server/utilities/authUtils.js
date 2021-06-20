const jwt = require('jsonwebtoken')

/**
 *
 * determine if user was passing validation and able to generate token
 * @param {Object} user
 * @return string
 */
function generateToken(user) {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.TOKEN
  )
}

module.exports = {
  generateToken,
}
