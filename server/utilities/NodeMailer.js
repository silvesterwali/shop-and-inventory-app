const nodemailer = require('nodemailer')
/**
 * `sendMail`
 *
 * - sendEmail is using `nodemailer` as email transporter
 *
 * @param {any} to - Comma separated `list` or an `array` of recipients email addresses that will appear on the To: field
 * example :[`'one@gmail.com'`,`'two@gmail.com'`] or `one@gmail.com,two@gmail.com`.
 *
 * @param {any} cc - Comma separated list or an array of recipients email addresses that will appear on the Cc: field
 * example :[`'one@gmail.com'`,`'two@gmail.com'`] or `one@gmail.com,two@gmail.com`.
 *
 * @param {string} subject - E-mail Subject
 * @param {string} text - E-mail body as plain text
 * @param {string} html - E-mail body as html
 * @param {array} attachments - An array of attachment objects (see Using attachments for details). Attachments can be used for embedding images as well
 * @returns {string}
 *
 * @see https://nodemailer.com/about/ for more documentation
 */
exports.sendEmail = async (
  to = 'silvesterlhwali123@gmail.com',
  cc = undefined,
  subject = 'Hello,bro are you there',
  text = undefined,
  html = undefined,
  attachments = []
) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER, // will place in env soon
      pass: process.env.EMAIL_PASS, // will place in env soon
    },
  })

  try {
    const info = await transporter.sendMail({
      from: 'silvesterwalidev@gmail.com', // will place in env soon
      to,
      cc,
      subject,
      text,
      html,
      attachments,
    })

    return info.messageId
  } catch (err) {
    throw new Error(err)
  }
}
