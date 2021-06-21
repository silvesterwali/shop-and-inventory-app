const moment = require('moment')
/**
 * stringToDateFormat
 *
 * - helper to convert date string from front end
 * - will return `YYYY-MM-DD` format
 */
exports.stringToDateFormat = (strTime) => {
  const dateToMoment = moment(strTime).format('YYYY-mm-dd')
  return new Date(dateToMoment).toISOString().substr(0, 10)
}
