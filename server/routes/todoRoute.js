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
const auth = require('../middleware/auth')
const todo = require('../controllers/TodoController')
router.use(auth)
router.get('/', todo.index)
router.post('/', todo.store)
router.get('/:id', todo.show)
router.put('/:id', todo.update)
router.delete('/:id', todo.destroy)

module.exports = router
