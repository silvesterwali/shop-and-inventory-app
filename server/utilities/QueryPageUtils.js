/**
 * QueryPageUtils
 * utilies for convert req.query for server side pagination
 *
 * @param {Object} query - example `{page:1,limit:1}` will return `{page,limit,startIndex,endIndex}`
 *
 */
const QueryPageUtils = (query) => {
  const limit = query.limit ? parseInt(query.limit) : 25
  const page = query.page ? parseInt(query.page) : 1
  const startIndex = (page - 1) * limit
  const endIndex = page * limit
  return {
    limit,
    page,
    startIndex,
    endIndex,
  }
}

exports.QueryPageUtils = QueryPageUtils
