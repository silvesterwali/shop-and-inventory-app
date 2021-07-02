/**
 * @copyright 2021
 * - service endpoint for Feedback
 *
 *
 *
 *
 **/
import ApiClient from './apiClient.js'

// endpoint for api endpoint

const url = `api/feedback`

/**
 * getFeedbackResources
 *
 * - endpoint to get all Feedback resource
 * @param {Number} limit - limit resource to retrieve from backend
 * @param {Number} page - current page index for pagination
 * @async
 *
 */
export const getFeedbackResources = async (limit, page) => {
  return await ApiClient.get(`/${url}?limit=${limit}&page=${page}`)
}

/**
 * createFeedbackResource
 *
 * - endpoint to create new Feedback resource
 * @param {Object} payload - data object for resource
 * @async
 *
 */
export const createFeedbackResource = async (payload) => {
  return await ApiClient.post(`/${url}`, payload)
}

/**
 * getFeedbackResource
 *
 * - endpoint to take specific Feedback resource
 * @param {String} id
 * @async
 *
 */
export const getFeedbackResource = async (id) => {
  return await ApiClient.get(`/${url}/${id}`)
}

/**
 * updateFeedbackResource
 *
 * - endpoint to update specific Feedback resource
 * @param {String} id - id of data resource
 * @param {Object} payload - data object for resource
 * @async
 *
 */
export const updateFeedbackResource = async (id, payload) => {
  return await ApiClient.put(`/${url}/${id}`, payload)
}

/**
 * deleteFeedbackResource
 *
 * - endpoint to delete specific Feedback resource
 * @param {String} id
 * @async
 *
 */
export const deleteFeedbackResource = async (id) => {
  return await ApiClient.delete(`/${url}/${id}`)
}
