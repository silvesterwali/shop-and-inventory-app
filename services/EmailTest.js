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

const url = `api/email-test`

/**
 * getEmailTestResources
 *
 * - endpoint to get all EmailTest resource
 * @async
 *
 */
export const getEmailTestResources = async () => {
  return await ApiClient.get(`/${url}`)
}
