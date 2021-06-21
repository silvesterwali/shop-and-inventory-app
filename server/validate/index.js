/* eslint-disable no-console */
const { body, validationResult } = require('express-validator')
const ObjectId = require('mongodb').ObjectID
const bycrypt = require('bcryptjs')
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
    body('username')
      .not()
      .isEmpty()
      .custom(async (value) => {
        const username = await db
          .collection('users')
          .findOne({ username: value })
        if (username) {
          throw new Error('username already in use')
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
    body('email').isEmail().withMessage('email is not valid').normalizeEmail(),
    body('password')
      .isLength({ min: 8, max: 20 })
      .withMessage('password length min 8 and max 20'),
  ]
}

/**
 *  specific rules for password changes request
 */
const passwordChangeRules = () => {
  return [
    body('currentPassword')
      .isLength({ min: 8, max: 20 })
      .custom(async (value, { req }) => {
        // find current user on database
        const user = await db
          .collection('users')
          .findOne({ _id: new ObjectId(req.user._id) })

        // determine if user was not authenticate
        if (!user) {
          throw new Error('User need to authenticate')
        }

        //  do compare the user current password with exiting on db
        const isPasswordValid = await bycrypt.compare(value, user.password)

        if (!isPasswordValid) {
          throw new Error('Current password is invalid')
        }
        return true
      }),
    body('password').isLength({ min: 8, max: 20 }),
    body('passwordConfirmation').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password')
      }
      return true
    }),
  ]
}

/**
 * profile validate
 *
 */
const personalValidate = () => {
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
 * bankAtmCardRules
 *
 * rules to validate  bank atm card request
 *
 *
 */
const bankAtmCardRules = () => {
  return [
    body('provider')
      .not()
      .isEmpty()
      .withMessage('provider is required')
      .isString()
      .withMessage('provide must be string')
      .trim(),
    body('cardNumber')
      .not()
      .isEmpty()
      .withMessage('card number is required')
      .isString()
      .withMessage('card number should be string')
      .trim(),
  ]
}

/**
 * determine if rules was pass to validate ,this method will check if request complete the requirement
 *
 */
const validate = (req, res, next) => {
  /**
   * return every error on one root object
   *
   */
  const simpleValidate = validationResult.withDefaults({
    formatter: (err) => err.msg,
    onlyFirstError: true,
  })

  const errors = simpleValidate(req)

  if (errors.isEmpty()) {
    return next()
  }

  return res.status(422).json(errors.mapped())
}

module.exports = {
  registrationRules,
  loginRules,
  passwordChangeRules,
  personalValidate,
  bankAtmCardRules,
  validate,
}
