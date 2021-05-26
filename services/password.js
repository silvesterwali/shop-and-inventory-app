/**
 * service for manage user password
 *
 */

import ApiClient from './apiClient.js'

/**
 * - to change auth password
 *
 */
const authUpdatePassword = async (userId, payload) => {
  return await ApiClient.put(`/api/auth/password-change/${userId}`, payload)
}

export { authUpdatePassword }
