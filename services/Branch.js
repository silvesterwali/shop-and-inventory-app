/**
 * @copyright 2021
 * - service endpoint for Branch
 *
 *
 *
 *
 **/
import ApiClient from './apiClient.js'

// endpoint for api endpoint

const url = `api/branch`

/**
 * getBranchResources
 *
 * - endpoint to get all Branch resource
 * @async
 *
 */
export const getBranchResources = async () => {
  return await ApiClient.get(`/${url}`)
}

/**
 * createBranchResource
 *
 * - endpoint to create new Branch resource
 * @param {Object} payload - data object for resource
 * @async
 *
 */
export const createBranchResource = async (payload) => {
  return await ApiClient.post(`/${url}`, payload)
}

/**
 * getBranchResource
 *
 * - endpoint to take specific Branch resource
 * @param {String} id
 * @async
 *
 */
export const getBranchResource = async (id) => {
  return await ApiClient.get(`/${url}/${id}`)
}

/**
 * updateBranchResource
 *
 * - endpoint to update specific Branch resource
 * @param {String} id - id of data resource
 * @param {Object} payload - data object for resource
 * @async
 *
 */
export const updateBranchResource = async (id, payload) => {
  return await ApiClient.put(`/${url}/${id}`, payload)
}

/**
 * deleteBranchResource
 *
 * - endpoint to delete specific Branch resource
 * @param {String} id
 * @async
 *
 */
export const deleteBranchResource = async (id) => {
  return await ApiClient.delete(`/${url}/${id}`)
}
