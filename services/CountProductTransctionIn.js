/**
 * @copyright 2021
 * - service endpoint for CountProductTransctionIn
 *
 *
 *
 *
 **/
import ApiClient from './apiClient.js'

// endpoint for api endpoint

const url = `api/count-product-transaction-in`

/**
 * getCountProductTransctionInResources
 *
 * - endpoint to get all CountProductTransctionIn resource
 * @async
 *
 */
export const getCountProductTransctionInResources = async () => {
  return await ApiClient.get(`/${url}`)
}
