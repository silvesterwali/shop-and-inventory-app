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
/**
 * delete personal sub collection
 *
 * @param {any} userId
 * @param {any} familyId
 */
const deleteFamily = async (userId, familyId) => {
  return await ApiClient.delete(
    `/api/personal/family/${userId}/user/${familyId}/family`
  )
}

/** ===============================
 *
 * personal bank atm card endpoint
 * ================================
 */

/**
 * getPersonalBankAtmCard
 *
 * endpoint to take personal bank atm card list
 * @param {any} userId
 *
 */
const getPersonalBankAtmCard = async (userId) => {
  return await ApiClient.get(`/api/personal/account/${userId}/user`)
}

/**
 * createPersonalBankAtmCard
 *
 * endpoint to create new personal bank atm card resource
 * @param {Object} payload
 */
const createPersonalBankAtmCard = async (payload) => {
  return await ApiClient.post(`/api/personal/account`, payload)
}

/**
 * updatePersonalBankAtmCard
 *
 * - update object personal bank atm card resource
 * @param {string} userId
 * @param {string} bankAtmCardId
 * @param {Object} payload
 */
const updatePersonalBankAtmCard = async (userId, bankAtmCardId, payload) => {
  return await ApiClient.put(
    `/api/personal/account/${userId}/user/${bankAtmCardId}/bank-atm-card`,
    payload
  )
}

/**
 * deletePersonalBankAtmCard
 *
 * - delete personal bank account resource
 * @param {string} userId
 * @param {string} bankAtmCardId
 */
const deletePersonalBankAtmCard = async (userId, bankAtmCardId) => {
  return await ApiClient.delete(
    `/api/personal/account/${userId}/user/${bankAtmCardId}/bank-atm-card`
  )
}

export {
  getUserProfile,
  createUserProfile,
  updateUserProfile,
  getFamilies,
  createFamily,
  updateFamily,
  deleteFamily,
  getPersonalBankAtmCard,
  createPersonalBankAtmCard,
  updatePersonalBankAtmCard,
  deletePersonalBankAtmCard,
}
