/**
 * QueryParams
 *
 * - method to create url query for example `{page:1,search:mysearch}`.
 * - the output example  `?page=1&search=mysearch`
 *
 *  @param {object} params
 */
export const QueryParams = (params) => {
  if (typeof params !== 'object') return
  const query = Object.keys(params)
    .map(function (key) {
      return params[key] === null || params[key] === ''
        ? `${key}=`
        : `${key}=${params[key]}`
    })
    .join('&')
  return '?' + query
}
