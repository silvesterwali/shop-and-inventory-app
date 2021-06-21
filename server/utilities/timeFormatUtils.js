const moment = require('moment')
/**
 * stringToDateFormat
 *
 * - helper to convert date string from front end
 * - will return `YYYY-MM-DD` format
 */
exports.stringToDateFormat = (strTime) => {
  return new Date(moment(strTime).format('YYYY-MM-DD[T00:00:00.000Z]'))
}
/**
 * currentDateFormat
 *
 */
exports.currentDateFormat = () => {
  return new Date(moment().format('YYYY-MM-DD[T00:00:00.000Z]'))
}
