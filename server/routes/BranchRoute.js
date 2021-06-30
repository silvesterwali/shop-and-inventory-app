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
const auth = require('../middleware/auth')
const router = express.Router()
const branch = require('../controllers/BranchController')
router.use(auth)
router.get('/', branch.index)
router.post('/', branch.store)
router.get('/:id', branch.show)
router.put('/:id', branch.update)
router.delete('/:id', branch.destroy)

module.exports = router
