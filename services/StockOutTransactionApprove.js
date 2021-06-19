/**
 * @copyright 2021
 * - service endpoint for StockOutTransactionApprove
 *
 *
 *
 *
 **/
import ApiClient from './apiClient.js'

// endpoint for api endpoint

const url = `api/stock-out-transaction-approve`

/**
 * updateStockOutTransactionApproveResource
 *
 * - endpoint to update specific StockOutTransactionApprove resource
 * - this endpoint is only specify to approve one stock out transaction
 * @param {String} id - id of data resource
 * @param {Object} payload - data object for resource
 * @async
 *
 */
export const updateStockOutTransactionApproveResource = async (id, payload) => {
  return await ApiClient.put(`/${url}/${id}`, payload)
}
