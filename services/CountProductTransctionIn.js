/**
 * @copyright 2021
 * - service endpoint for CountProductTransctionIn
 *
 *
 *
 *
 **/
import ApiClient from './apiClient.js'
import { QueryParams } from './Query/QueryParams.js'
// endpoint for api endpoint

const url = `api/count-product-transaction-in`

/**
 * getCountProductTransctionInResources
 *
 * - endpoint to get all CountProductTransctionIn resource
 * @async
 *
 */
export const getCountProductTransctionInResources = async (params) => {
  const query = QueryParams(params)
  return await ApiClient.get(`/${url}` + query)
}
