const express = require('express')
const router = express.Router()
const { list, add, check, remove } = require('../controllers/admin')

//GET MECHANICS
router.get('/admin', list)

//CHECK MECHANICS
router.post('/admin/check', check)

//POST A MECHANIC
router.post('/admin/add', add)

//REMOVE A MECHANIC
router.delete('/admin/:id', remove)

module.exports = router
