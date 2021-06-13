/**
 * @copyright 2021
 * - this controller is just responsible to  increase in the total stock of goods
 * - this will work with incoming stock
 * - will change the status to 1 (status effect the qty stock of product)
 **/

/**
 *=====================================
 * update
 *
 *
 * - update the specific resource
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @async
 **/
exports.update = (req, res) => {
  /**
   * - 1 take incomingStock by _id
   * - 2 validate if the incomingStock has productsInTransaction item more then one
   *
   */
}
