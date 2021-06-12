/**
 * @copyright 2021
 * - service endpoint for IncomingStockDetail
 *
 *
 *
 *
 **/
import ApiClient from './apiClient.js'

// endpoint for api endpoint

const url = `api/incoming-stock-detail`

/**
 * getIncomingStockDetailResources
 *
 * - endpoint to get all IncomingStockDetail resource
 * @param {String} StockInId  - stock header _id 
 
 * @async
 *
 */
export const getIncomingStockDetailResources = async (StockInId) => {
  return await ApiClient.get(`/${url}/${StockInId}/main`)
}

/**
 * createResource
 *
 * - endpoint to create new IncomingStockDetail resource
 * @param {String} StockInId - stock main _id
 * @param {Object} payload - data object for resource
 * @async
 *
 */
export const createIncomingStockDetailResource = async (StockInId, payload) => {
  return await ApiClient.post(`/${url}/${StockInId}/main`, payload)
}

/**
 * getResource
 *
 * - endpoint to take specific IncomingStockDetail resource
 * @param {String} id
 * @async
 *
 */
export const getIncomingStockDetailResource = async (id) => {
  return await ApiClient.get(`/${url}/${id}`)
}

/**
 * updateResource
 *
 * - endpoint to update specific IncomingStockDetail resource
 * @param {String} StockInId - stock header _id
 * @param {String} id - id of data resource
 * @param {Object} payload - data object for resource
 * @async
 *
 */
export const updateIncomingStockDetailResource = async (
  StockInId,
  id,
  payload
) => {
  return await ApiClient.put(`/${url}/${StockInId}/main/${id}/detail`, payload)
}

/**
 * deleteResource
 *
 * - endpoint to delete specific IncomingStockDetail resource
 * @param {String} StockInId - stock header _id
 * @param {String} id
 * @async
 *
 */
export const deleteIncomingStockDetailResource = async (StockInId, id) => {
  return await ApiClient.delete(`/${url}/${StockInId}/main/${id}/detail`)
}
