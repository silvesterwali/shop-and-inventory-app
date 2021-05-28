/* eslint-disable no-console */
const express = require('express')
const router = express.Router()

const { bankAtmCardRules, validate } = require('../validate')

const atmCardController = require('../controllers/atmCardController')

// implement authenticate middleware

router.use(require('../middleware/auth'))

/**
 * get all personal bank atm card
 *
 *@param {express.Request} req
 *@param {express.Response} res
 */
router.get('/:userId/user', atmCardController.getPersonalAtmCard)

/**
 * create new bank atm card resource
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
router.post(
  '/',
  bankAtmCardRules(),
  validate(),
  atmCardController.createPersonalAtmCard
)

/**
 * update specific bank atm card
 *
 * @param {express.Request} req
 * @param {express.Response} res
 *
 */
router.put(
  '/:userId/user/:bankAtmCardId/bank-atm-card',
  bankAtmCardRules(),
  validate,
  atmCardController.updatePersonalBankAtmCard
)

/***
 * delete specific bank atm card
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */

router.delete(
  '/:userId/user/:bankAtmCardId/bank-atm-card',
  atmCardController.deletePersonalBankAtmCard
)

module.exports = router
