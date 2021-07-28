/**
 * @copyright 2021
 * - service endpoint for EmailTest
 *
 *
 *
 *
 **/
import ApiClient from './apiClient.js'

// endpoint for api endpoint

const url = `email-test`

/**
 * getEmailTestResources
 *
 * - endpoint to get all EmailTest resource
 * @param {Number} limit - limit resource to retrieve from backend
 * @param {Number} page - current page index for pagination
 * @async
 *
 */
export const getEmailTestResources = async (limit, page) => {
  return await ApiClient.get(`/${url}?limit=${limit}&page=${page}`)
}
