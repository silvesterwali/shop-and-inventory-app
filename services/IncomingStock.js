/**
 * @copyright 2021
 * - service endpoint for incomingStock
 *
 *
 *
 *
 **/
import ApiClient from './apiClient.js'

/**
* getResources
*
* - endpoint to get all incomingStock resource 
* @param {Number} limit - limit resource to retrieve from backend
* @param {Number} page - current page index for pagination
* @async

*/
export const getIncomingStockResources = async (limit, page) => {
  return await ApiClient.get(`/incomingStock?limit=${limit}&page=${page}`)
}

/**
* createResource
*
* - endpoint to create new incomingStock resource 
* @param {Object} payload - data object for resource
* @async

*/
export const createIncomingStockResource = async (payload) => {
  return await ApiClient.post(`/incomingStock`, payload)
}

/**
* getResource
*
* - endpoint to take specific incomingStock resource 
* @param {String} id
* @async

*/
export const getIncomingStockResource = async (id) => {
  return await ApiClient.get(`/incomingStock/${id}`)
}

/**
* updateResource
*
* - endpoint to update specific incomingStock resource 
* @param {String} id - id of data resource
* @param {Object} payload - data object for resource
* @async

*/
export const updateIncomingStockResource = async (id, payload) => {
  return await ApiClient.put(`/incomingStock/${id}`, payload)
}

/**
* deleteResource
*
* - endpoint to delete specific incomingStock resource 
* @param {String} id
* @async

*/
export const deleteIncomingStockResource = async (id) => {
  return await ApiClient.delete(`/incomingStock/${id}`)
}
