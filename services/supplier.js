/**
 * @copyright 2021
 * - service endpoint for supplier
 *
 *
 *
 *
 **/
import ApiClient from './apiClient.js'

// endpoint for api endpoint

const url = `api/supplier`

/**
 * getResources
 *
 * - endpoint to get all supplier resource
 * @async
 *
 */
export const getSupplierResources = async () => {
  return await ApiClient.get(`/${url}`)
}

/**
 * createResource
 *
 * - endpoint to create new supplier resource
 * @param {Object} payload - data object for resource
 * @async
 *
 */
export const createSupplierResource = async (payload) => {
  return await ApiClient.post(`/${url}`, payload)
}

/**
 * getResource
 *
 * - endpoint to take specific supplier resource
 * @param {String} id
 * @async
 *
 */
export const getSupplierResource = async (id) => {
  return await ApiClient.get(`/${url}/${id}`)
}

/**
 * updateResource
 *
 * - endpoint to update specific supplier resource
 * @param {String} id - id of data resource
 * @param {Object} payload - data object for resource
 * @async
 *
 */
export const updateSupplierResource = async (id, payload) => {
  return await ApiClient.put(`/${url}/${id}`, payload)
}

/**
 * deleteResource
 *
 * - endpoint to delete specific supplier resource
 * @param {String} id
 * @async
 *
 */
export const deleteSupplierResource = async (id) => {
  return await ApiClient.delete(`/${url}/${id}`)
}
