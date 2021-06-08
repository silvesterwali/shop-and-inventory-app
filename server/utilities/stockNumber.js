const moment = require('moment')
const db = require('../db').db
exports.stockInNumber = async () => {
  const lastCountStockIn = await db
    .collection('IncomingStocks')
    .countDocuments()
  return 'STM' + moment().format('YYYYMMDD') + '0000' + lastCountStockIn
}
