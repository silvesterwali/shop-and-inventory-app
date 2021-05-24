/* eslint-disable no-console */

/**
 * - middleware check user ability to do something
 *
 *
 *  @param {string} permissionAbility - what user ability
 *  @see https://expressjs.com/en/guide/writing-middleware.html - for more information about current middleware
 */
module.exports = function (permissionAbility) {
  return function (req, res, next) {
    // TODO : doing check ability from database

    console.log(permissionAbility)

    return next()
  }
}
