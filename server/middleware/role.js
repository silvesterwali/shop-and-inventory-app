/**
 * middleware to check if current user has give role
 *
 *
 */

/**
 * check role from current user
 *
 * @param {string} roleName
 */
module.exports = function (roleName) {
  return function (req, res, next) {
    // eslint-disable-next-line no-console
    console.log(roleName)

    return next()
  }
}
