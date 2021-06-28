/**
 * @copyright 2021
 * - service endpoint for ProductInStockOutTransactions
 *
 *
 *
 *
 **/
import ApiClient from './apiClient.js'

// endpoint for api endpoint

const url = `ProductInStockOutTransactions`

/**
 * getProductInStockOutTransactions
 *
 * - endpoint to get all ProductInStockOutTransactions resource
 * @param {Number} limit - limit resource to retrieve from backend
 * @param {Number} page - current page index for pagination
 * @async
 *
 */
export const getProductInStockOutTransactions = async (limit, page) => {
  return await ApiClient.get(`/${url}?limit=${limit}&page=${page}`)
}
