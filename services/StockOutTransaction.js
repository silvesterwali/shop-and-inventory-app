/**
 * @copyright 2021
 * - service endpoint for StockOutTransaction
 *
 *
 *
 *
 **/
import ApiClient from './apiClient.js'

// endpoint for api endpoint

const url = `api/stock-out-transaction`

/**
 * getStockOutTransactionResources
 *
 * - endpoint to get all StockOutTransaction resource
 * @param {Number} limit - limit resource to retrieve from backend
 * @param {Number} page - current page index for pagination
 * @async
 *
 */
export const getStockOutTransactionResources = async (limit, page) => {
  return await ApiClient.get(`/${url}?limit=${limit}&page=${page}`)
}

/**
 * createStockOutTransactionResource
 *
 * - endpoint to create new StockOutTransaction resource
 * @param {Object} payload - data object for resource
 * @async
 *
 */
export const createStockOutTransactionResource = async (payload) => {
  return await ApiClient.post(`/${url}`, payload)
}

/**
 * getStockOutTransactionResource
 *
 * - endpoint to take specific StockOutTransaction resource
 * @param {String} id
 * @async
 *
 */
export const getStockOutTransactionResource = async (id) => {
  return await ApiClient.get(`/${url}/${id}`)
}

/**
 * updateStockOutTransactionResource
 *
 * - endpoint to update specific StockOutTransaction resource
 * @param {String} id - id of data resource
 * @param {Object} payload - data object for resource
 * @async
 *
 */
export const updateStockOutTransactionResource = async (id, payload) => {
  return await ApiClient.put(`/${url}/${id}`, payload)
}

/**
 * deleteStockOutTransactionResource
 *
 * - endpoint to delete specific StockOutTransaction resource
 * @param {String} id
 * @async
 *
 */
export const deleteStockOutTransactionResource = async (id) => {
  return await ApiClient.delete(`/${url}/${id}`)
}
