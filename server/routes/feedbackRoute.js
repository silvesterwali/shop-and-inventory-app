/**
 *=============================================
 * - @copyright 2021
 *
 * router
 *
 *
 *
 *
 *
 **/

const express = require('express')
const router = express.Router()
const feedback = require('../controllers/FeedbackController')
const auth = require('../middleware/auth')
router.get('/', auth, feedback.index)
router.post('/', feedback.store)
router.get('/:id', auth, feedback.show)
router.put('/:id', auth, feedback.update)
router.delete('/:id', auth, feedback.destroy)

module.exports = router
