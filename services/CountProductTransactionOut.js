/**
 * @copyright 2021
 * - service endpoint for CountProductTransactionOut
 *
 *
 *
 *
 **/
import ApiClient from './apiClient.js'
import { QueryParams } from './Query/QueryParams.js'
// endpoint for api endpoint

const url = `api/count-product-transaction-out`

/**
 * getCountProductTransactionOutResources
 *
 * - endpoint to get all CountProductTransactionOut resource
 * @async
 *
 */
export const getCountProductTransactionOutResources = async (params) => {
  const query = QueryParams(params)
  return await ApiClient.get(`/${url}` + query)
}
