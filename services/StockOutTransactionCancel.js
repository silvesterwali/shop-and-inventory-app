/**
 * @copyright 2021
 * - service endpoint for StockOutTransactionCancel
 *
 *
 *
 *
 **/
import ApiClient from './apiClient.js'

// endpoint for api endpoint

const url = `api/stock-out-transaction-cancel`

/**
 * updateStockOutTransactionCancelResource
 *
 * - to cancel current stock out transaction
 * - endpoint to update specific StockOutTransactionCancel resource
 * @param {String} id - id of data resource
 * @param {Object} payload - data object for resource
 * @async
 *
 */
export const updateStockOutTransactionCancelResource = async (id, payload) => {
  return await ApiClient.put(`/${url}/${id}`, payload)
}
