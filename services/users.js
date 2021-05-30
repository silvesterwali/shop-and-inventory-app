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
  return await ApiClient.get(`/api/users?limit=${limit}&page=${page}`)
}

/**
 * getUserDetails
 *
 * - get a user information including personal data
 * @param {String} userId
 */
export const getUserDetail = async (userId) => {
  return await ApiClient.get(`/api/users/${userId}/user`)
}
