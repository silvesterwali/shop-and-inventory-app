/**
 * all service for all user personal endpoint
 *
 */

import ApiClient from './apiClient.js'

const getUserProfile = async (userId) => {
  return await ApiClient.get(`/api/auth/personal/${userId}`)
}
