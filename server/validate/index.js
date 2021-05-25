/* eslint-disable no-console */
const { body, validationResult } = require('express-validator')
const ObjectId = require('mongodb').ObjectID
const db = require('../db').db
/**
 * specific rules for authenticate registration request
 *
 */
const registrationRules = () => {
  return [
    body('email')
      .not()
      .isEmpty()
      .isEmail()
      .normalizeEmail()
      .custom(async (value) => {
        const user = await db.collection('users').findOne({ email: value })
        if (user) {
          throw new Error('email already in use')
        }
        return true
      }),
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
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 8, max: 20 }),
  ]
}

/**
 *  specific rules for password changes request
 */
const passwordChangeRules = () => {
  return [
    body('currentPassword').isLength({ min: 8, max: 20 }),
    body('password').isLength({ min: 8, max: 20 }),
    body('passwordConfirmation').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password')
      }
    }),
  ]
}

/**
 * profile validate
 *
 */
const ProfileValidate = () => {
  return [
    body('fullName').not().isEmpty().trim().isString(),
    body('phone').not().isEmpty().trim().isString(),
    body('userId').custom((value) => {
      if (!ObjectId.isValid(value)) {
        throw new Error('user id is not valid for database')
      }
      return true
    }),
  ]
}

/**
 * determine if rules was pass to validate ,this method will check if request complete the requirement
 *
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
  passwordChangeRules,
  ProfileValidate,
  validate,
}
