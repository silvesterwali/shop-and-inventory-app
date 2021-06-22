const moment = require('moment')
const db = require('../db').db
/**
 * customerSerialNumberGenerate
 *
 * - create customer serial number
 * @return {String}
 */
exports.customerSerialNumberGenerate = async () => {
  try {
    const valueNumber = await db
      .collection('customers')
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
            lastGreat: {
              $max: { $toInt: '$last_index' },
            },
          },
        },
        {
          $sort: {
            lastGreat: -1,
          },
        },
        {
          $limit: 1,
        },
      ])
      .toArray()
    const lastNumber =
      valueNumber.length > 0 ? parseInt(valueNumber[0].lastGreat) : 0
    const newNumber = lastNumber + 1
    const strLength = newNumber.toString().length
    let _stringFormat = ''
    for (let i = 6; i > 1; i--) {
      if (strLength === i) {
        break
      }
      _stringFormat += '0'.toString()
    }

    return 'CT' + moment().format('YYYY') + _stringFormat + newNumber.toString()
  } catch (err) {
    throw new Error(err)
  }
}
