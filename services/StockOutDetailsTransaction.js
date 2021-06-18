/**
 * @copyright 2021
 * - service endpoint for StockOutDetailsTransaction
 *
 *
 *
 *
 **/
import ApiClient from './apiClient.js'

// endpoint for api endpoint

const url = `StockOutDetailsTransaction`

/**
 * getStockOutDetailsTransactionResources
 *
 * - endpoint to get all StockOutDetailsTransaction resource
 * @param {Number} limit - limit resource to retrieve from backend
 * @param {Number} page - current page index for pagination
 * @async
 *
 */
export const getStockOutDetailsTransactionResources = async (limit, page) => {
  return await ApiClient.get(`/${url}?limit=${limit}&page=${page}`)
}

/**
 * createStockOutDetailsTransactionResource
 *
 * - endpoint to create new StockOutDetailsTransaction resource
 * @param {Object} payload - data object for resource
 * @async
 *
 */
export const createStockOutDetailsTransactionResource = async (payload) => {
  return await ApiClient.post(`/${url}`, payload)
}

/**
 * getStockOutDetailsTransactionResource
 *
 * - endpoint to take specific StockOutDetailsTransaction resource
 * @param {String} id
 * @async
 *
 */
export const getStockOutDetailsTransactionResource = async (id) => {
  return await ApiClient.get(`/${url}/${id}`)
}

/**
 * updateStockOutDetailsTransactionResource
 *
 * - endpoint to update specific StockOutDetailsTransaction resource
 * @param {String} id - id of data resource
 * @param {Object} payload - data object for resource
 * @async
 *
 */
export const updateStockOutDetailsTransactionResource = async (id, payload) => {
  return await ApiClient.put(`/${url}/${id}`, payload)
}

/**
 * deleteStockOutDetailsTransactionResource
 *
 * - endpoint to delete specific StockOutDetailsTransaction resource
 * @param {String} id
 * @async
 *
 */
export const deleteStockOutDetailsTransactionResource = async (id) => {
  return await ApiClient.delete(`/${url}/${id}`)
}
