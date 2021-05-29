/**
 * user service endpoint
 *
 *  - will contain user endpoint for backend
 */

import ApiClient from './apiClient.js'

export const getUsers = async (limit, page) => {
  return await ApiClient.get(`/api/users?limit=${limit}&page=${page}`)
}
