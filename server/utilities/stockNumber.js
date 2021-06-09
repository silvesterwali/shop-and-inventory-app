const moment = require('moment')
const db = require('../db').db
exports.stockInNumber = async () => {
  const valueOfNumber = await db
    .collection('IncomingStocks')
    .aggregate([
      {
        $addFields: {
          // adding new field to document
          last_index: {
            // select last substring
            $substr: [
              '$serialNumber',
              {
                $subtract: [
                  {
                    $strLenCP: '$serialNumber',
                  },
                  6,
                ],
              },
              6,
            ],
          },
        },
      },
      {
        $project: {
          last_serial: {
            $max: '$last_index',
          },
        },
      },
      {
        $limit: 1,
      },
    ])
    .toArray()

  const lastCountStockIn =
    valueOfNumber.length > 0 ? parseInt(valueOfNumber[0].last_serial) : 0
  const newNumber = lastCountStockIn + 1
  const strLength = newNumber.toString().length
  let _stringFormat = ''
  for (let index = 6; index > 1; index--) {
    _stringFormat += '0'.toString()
    if (strLength === index) {
      break
    }
  }
  return (
    'STM' +
    moment().format('YYYYMMDD') +
    _stringFormat.toString() +
    newNumber.toString()
  )
}
