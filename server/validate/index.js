const { body, validationResult } = require('express-validator')

/**
 * specific rules for authenticate registration request
 *
 */
const registrationRules = () => {
  return [
    body('email').isEmail(),
    body('password').isLength({ min: 8, max: 20 }),
    // @see https://express-validator.github.io/docs/custom-validators-sanitizers.html#example-checking-if-password-confirmation-matches-password
    body('passwordConfirmation').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password')
      }
      return true
    }),
  ]
}

/**
 * specific rules for login authentication
 *
 **/
const loginRules = () => {
  return [
    body('email').isEmail(),
    body('password').isLength({ min: 8, max: 20 }),
  ]
}

/**
 * determine if rules was pass to validate ,this method will check if request complete the requirement
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
const validate = (req, res, next) => {
  const errors = validationResult(req)

  if (errors.isEmpty()) {
    return next()
  }

  const extractedErrors = []

  // looping all errors  by object key or parameter according passing rules

  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json(extractedErrors)
}

module.exports = {
  registrationRules,
  loginRules,
  validate,
}
