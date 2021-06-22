/**
 * @copyright 2021
 * - service endpoint for Customer
 *
 *
 *
 *
 **/
import ApiClient from './apiClient.js'

// endpoint for api endpoint

const url = `api/customer`

/**
 * getCustomerResources
 *
 * - endpoint to get all Customer resource
 * @async
 *
 */
export const getCustomerResources = async () => {
  return await ApiClient.get(`/${url}`)
}

/**
 * createCustomerResource
 *
 * - endpoint to create new Customer resource
 * @param {Object} payload - data object for resource
 * @async
 *
 */
export const createCustomerResource = async (payload) => {
  return await ApiClient.post(`/${url}`, payload)
}

/**
 * getCustomerResource
 *
 * - endpoint to take specific Customer resource
 * @param {String} id
 * @async
 *
 */
export const getCustomerResource = async (id) => {
  return await ApiClient.get(`/${url}/${id}`)
}

/**
 * updateCustomerResource
 *
 * - endpoint to update specific Customer resource
 * @param {String} id - id of data resource
 * @param {Object} payload - data object for resource
 * @async
 *
 */
export const updateCustomerResource = async (id, payload) => {
  return await ApiClient.put(`/${url}/${id}`, payload)
}

/**
 * deleteCustomerResource
 *
 * - endpoint to delete specific Customer resource
 * @param {String} id
 * @async
 *
 */
export const deleteCustomerResource = async (id) => {
  return await ApiClient.delete(`/${url}/${id}`)
}
