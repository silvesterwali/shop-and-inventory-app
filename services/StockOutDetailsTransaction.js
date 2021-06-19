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

const url = `api/stock-out-transaction-detail`

/**
 * getStockOutDetailsTransactionResources
 *
 * - endpoint to get all StockOutDetailsTransaction resource
 * @param {String} stockOutId - stock out id
 * @async
 *
 */
export const getStockOutDetailsTransactionResources = async (stockOutId) => {
  return await ApiClient.get(`/${url}/${stockOutId}`)
}

/**
 * createStockOutDetailsTransactionResource
 *
 * - endpoint to create new StockOutDetailsTransaction resource
 * @param {Object} payload - data object for resource
 * @async
 *
 */
export const createStockOutDetailsTransactionResource = async (
  stockOutId,
  payload
) => {
  return await ApiClient.post(`/${url}/${stockOutId}`, payload)
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
export const updateStockOutDetailsTransactionResource = async (
  stockOutId,
  id,
  payload
) => {
  return await ApiClient.put(`/${url}/${stockOutId}/detail${id}`, payload)
}

/**
 * deleteStockOutDetailsTransactionResource
 *
 * - endpoint to delete specific StockOutDetailsTransaction resource
 * @param {String} id
 * @async
 *
 */
export const deleteStockOutDetailsTransactionResource = async (
  stockOutId,
  id
) => {
  return await ApiClient.delete(`/${url}/${stockOutId}/detail/${id}`)
}
