/**
 * @copyright 2021
 *
 *
 **/
const NodeMailer = require('../utilities/NodeMailer')

/**
 *=====================================
 * index
 *
 * - get listing of resources
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @async
 **/
exports.index = async (_req, res) => {
  const to = 'silvesterlhwali123@gmail.com'
  const cc = undefined
  const subject = 'Hello,Ini Email and'
  const text = 'lorem ipsum'
  const html = `<html>
        <body>
            <h1>Hello Bro</h1>
        </body>
        </html>`
  try {
    const email = await NodeMailer.sendEmail(to, cc, subject, text, html)
    return res.json({ message: email })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
