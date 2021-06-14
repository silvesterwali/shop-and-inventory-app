/**
 * @copyright 2021
 * - service endpoint for StockIncrease
 *
 *
 *
 *
 **/
import ApiClient from './apiClient.js'

// endpoint for api endpoint

const url = `api/stock`

/**
 * updateStockIncreaseResource
 *
 * - endpoint to update specific StockIncrease resource
 * @param {String} id - id of data resource
 * @async
 *
 */
export const updateStockIncreaseResource = async (id) => {
  return await ApiClient.put(`/${url}/${id}/stock-increase`)
}
