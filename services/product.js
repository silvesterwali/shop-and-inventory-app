/**
 * endpoint for access product resource
 *
 *
 */

import ApiClient from './apiClient.js'

/**
 * getProducts
 *
 * - endpoint to get all product resource
 * @param {Number} limit
 * @param {Number} page
 */
export const getProducts = async (limit, page) => {
  return await ApiClient.get(`/api/product?limit=${limit}&page=${page}`)
}

/**
 * createProduct
 *
 * - endpoint create new product resource
 * @param {Object} payload
 */
export const createProduct = async (payload) => {
  return await ApiClient.post(`/api/product`, payload)
}

/**
 * getProduct
 *
 * - endpoint get specific product resource
 * @param {String} productId
 */
export const getProduct = async (productId) => {
  return await ApiClient.get(`/api/product/${productId}`)
}

/**
 * updateProduct
 *
 * - endpoint to update specific product resource
 * @param {String} productId
 * @param {Object} payload
 */
export const updateProduct = async (productId, payload) => {
  return await ApiClient.put(`/api/product/${productId}`, payload)
}

/**
 * deleteProduct
 *
 * - endpoint delete specific product resource
 * @param {String} productId
 */
export const deleteProduct = async (productId) => {
  return await ApiClient.delete(`/api/product/${productId}`)
}
