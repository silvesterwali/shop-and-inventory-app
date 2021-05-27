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

/**
 * create new UserProfile
 *
 * @param {Object} payload
 */
const createUserProfile = async (payload) => {
  return await ApiClient.post(`/api/auth/personal`, payload)
}

/**
 * update user personal
 *
 *
 * @param {String} id
 * @param {Object} payload
 * */
const updateUserProfile = async (id, payload) => {
  return await ApiClient.put(`/api/auth/personal/${id}`, payload)
}

/**
 * get personal families
 * @param {String} userId
 */
const getFamilies = async (userId) => {
  return await ApiClient.get(`/api/personal/family/${userId}/user`)
}

/**
 * create new personal families
 * @param {Object} payload
 */
const createFamily = async (payload) => {
  return await ApiClient.post('/api/personal/family', payload)
}

/**
 * update user family sub documents
 *
 * @param {any} userId
 * @param {any} familyId
 * @param {Object} payload
 */
const updateFamily = async (userId, familyId, payload) => {
  return await ApiClient.put(
    `/api/personal/family/${userId}/user/${familyId}/family`,
    payload
  )
}

export {
  getUserProfile,
  createUserProfile,
  updateUserProfile,
  getFamilies,
  createFamily,
  updateFamily,
}
