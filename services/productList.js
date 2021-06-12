/**
 * @copyright 2021
 * - service endpoint for productList
 * - service just load all product without pagination
 *
 *
 *
 **/
import ApiClient from './apiClient.js'

// endpoint for api endpoint

const url = `product-list`

/**
 * getProductListResources
 *
 * - endpoint to get all productList resource
 * @param {Number} limit - limit resource to retrieve from backend
 * @param {Number} page - current page index for pagination
 * @async
 *
 */
export const getProductListResources = async () => {
  return await ApiClient.get(`/${url}`)
}
