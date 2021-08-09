/**
 * UserRules
 *
 * - check if user role contain any given rules
 * @param {object} user - user object
 * @param {String} roleName
 * @returns {Boolean}
 */
exports.UserRules = (user, roleName) => {
  const arrayOfUserRole = new Array(user.rules)
  if (arrayOfUserRole.includes[roleName]) return true
  return false
}
