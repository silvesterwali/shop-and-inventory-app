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

const url = `/api/incoming-stock-detail`

/**
 * getResources
 *
 * - endpoint to get all IncomingStockDetail resource
 * @param {Number} limit - limit resource to retrieve from backend
 * @param {Number} page - current page index for pagination
 * @async
 *
 */
export const getIncomingStockDetailResources = async (limit, page) => {
  return await ApiClient.get(`/${url}?limit=${limit}&page=${page}`)
}

/**
 * createResource
 *
 * - endpoint to create new IncomingStockDetail resource
 * @param {Object} payload - data object for resource
 * @async
 *
 */
export const createIncomingStockDetailResource = async (payload) => {
  return await ApiClient.post(`/${url}`, payload)
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
 * @param {String} id - id of data resource
 * @param {Object} payload - data object for resource
 * @async
 *
 */
export const updateIncomingStockDetailResource = async (id, payload) => {
  return await ApiClient.put(`/${url}/${id}`, payload)
}

/**
 * deleteResource
 *
 * - endpoint to delete specific IncomingStockDetail resource
 * @param {String} id
 * @async
 *
 */
export const deleteIncomingStockDetailResource = async (id) => {
  return await ApiClient.delete(`/${url}/${id}`)
}
