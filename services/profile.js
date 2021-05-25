/**
 * all service for all user personal endpoint
 *
 */

import ApiClient from './apiClient.js'

/**
 * get user profile
 *
 * @param {any} userId
 *
 */
const getUserProfile = async (userId) => {
  return await ApiClient.get(`/api/auth/personal/${userId}`)
}

export { getUserProfile }
