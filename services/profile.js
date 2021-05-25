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
  return await ApiClient.get(`/api/auth/profile/${userId}`)
}

/**
 * create new UserProfile
 *
 * @param {Object} payload
 */
const createUserProfile = async (payload) => {
  return await ApiClient.post(`/api/auth/profile`, payload)
}

/**
 * update user profile
 *
 *
 * @param {String} id
 * @param {Object} payload
 * */
const updateUserProfile = async (id, payload) => {
  return await ApiClient.put(`/api/auth/profile/${id}`, payload)
}

export { getUserProfile, createUserProfile, updateUserProfile }
