/**
 * @copyright 2021
 * - service endpoint for ItemDashboard
 *
 *
 *
 *
 **/
import ApiClient from './apiClient.js'

// endpoint for api endpoint

const url = `api/item-dashboard`

/**
 * getItemDashboardResources
 *
 * - endpoint to get all ItemDashboard resource
 * @async
 *
 */
export const getItemDashboardResources = async () => {
  return await ApiClient.get(`/${url}`)
}
