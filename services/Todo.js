/**
 * @copyright 2021
 * - service endpoint for todo
 *
 *
 *
 *
 **/
import ApiClient from './apiClient.js'
import { QueryParams } from './Query/QueryParams.js'
// endpoint for api endpoint

const url = `api/todo`

/**
 * gettodoResources
 *
 * - endpoint to get all todo resource
 * @param {Object} params - url Query example `{page:1,limit:20,search:'mySearch'}`
 * @async
 *
 */
export const getTodoResources = async (params) => {
  const query = QueryParams(params)
  return await ApiClient.get(`/${url}` + query)
}

/**
 * createtodoResource
 *
 * - endpoint to create new todo resource
 * @param {Object} payload - data object for resource
 * @async
 *
 */
export const createTodoResource = async (payload) => {
  return await ApiClient.post(`/${url}`, payload)
}

/**
 * gettodoResource
 *
 * - endpoint to take specific todo resource
 * @param {String} id
 * @async
 *
 */
export const getTodoResource = async (id) => {
  return await ApiClient.get(`/${url}/${id}`)
}

/**
 * updatetodoResource
 *
 * - endpoint to update specific todo resource
 * @param {String} id - id of data resource
 * @param {Object} payload - data object for resource
 * @async
 *
 */
export const updateTodoResource = async (id, payload) => {
  return await ApiClient.put(`/${url}/${id}`, payload)
}

/**
 * deletetodoResource
 *
 * - endpoint to delete specific todo resource
 * @param {String} id
 * @async
 *
 */
export const deleteTodoResource = async (id) => {
  return await ApiClient.delete(`/${url}/${id}`)
}
