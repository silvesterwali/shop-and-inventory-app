/**
 * @copyright 2021
 * - service endpoint for Brand
 *
 *
 *
 *
 **/
import ApiClient from './apiClient.js'

// endpoint for api endpoint

const url = `api/brand`

/**
 * getBrandResources
 *
 * - endpoint to get all Brand resource
 * @async
 *
 */
export const getBrandResources = async () => {
  return await ApiClient.get(`/${url}`)
}

/**
 * createBrandResource
 *
 * - endpoint to create new Brand resource
 * @param {Object} payload - data object for resource
 * @async
 *
 */
export const createBrandResource = async (payload) => {
  return await ApiClient.post(`/${url}`, payload)
}

/**
 * getBrandResource
 *
 * - endpoint to take specific Brand resource
 * @param {String} id
 * @async
 *
 */
export const getBrandResource = async (id) => {
  return await ApiClient.get(`/${url}/${id}`)
}

/**
 * updateBrandResource
 *
 * - endpoint to update specific Brand resource
 * @param {String} id - id of data resource
 * @param {Object} payload - data object for resource
 * @async
 *
 */
export const updateBrandResource = async (id, payload) => {
  return await ApiClient.put(`/${url}/${id}`, payload)
}

/**
 * deleteBrandResource
 *
 * - endpoint to delete specific Brand resource
 * @param {String} id
 * @async
 *
 */
export const deleteBrandResource = async (id) => {
  return await ApiClient.delete(`/${url}/${id}`)
}
