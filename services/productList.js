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

const url = `api/product-list`

/**
 * getProductListResources
 *
 * - endpoint to get all productList resource
 * - endpoint will display product list without pagination
 * @async
 *
 */
export const getProductListResources = async () => {
  return await ApiClient.get(`/${url}`)
}
