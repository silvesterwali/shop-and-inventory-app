/**
 * user service endpoint
 *
 *  - will contain user endpoint for backend
 */

import ApiClient from './apiClient.js'

/**
 * getUser
 *
 * get all user collection
 * @param {Number} limit
 * @param {Number} page
 */
export const getUsers = async (limit, page) => {
  return await ApiClient.get(`/api/user?limit=${limit}&page=${page}`)
}

/**
 * getUserDetails
 *
 * - get a user information including personal data
 * @param {String} id
 */
export const getUserDetail = async (id) => {
  return await ApiClient.get(`/api/user/${id}`)
}
