/**
 * @copyright 2021
 * - service endpoint for CancelIncomingStock
 *
 *
 *
 *
 **/
import ApiClient from './apiClient.js'

// endpoint for api endpoint

const url = `api/incoming-stock-cancellation`

/**
 * updateCancelIncomingStockResource
 *
 * - endpoint to update specific CancelIncomingStock resource
 * @param {String} id - id of data resource
 * @param {Object} payload - data object for resource
 * @async
 *
 */
export const updateCancelIncomingStockResource = async (id, payload) => {
  return await ApiClient.put(`/${url}/${id}/stock`, payload)
}
