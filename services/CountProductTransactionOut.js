/**
 * @copyright 2021
 * - service endpoint for CountProductTransactionOut
 *
 *
 *
 *
 **/
import ApiClient from './apiClient.js'

// endpoint for api endpoint

const url = `api/count-product-transaction-out`

/**
 * getCountProductTransactionOutResources
 *
 * - endpoint to get all CountProductTransactionOut resource
 * @async
 *
 */
export const getCountProductTransactionOutResources = async () => {
  return await ApiClient.get(`/${url}`)
}
