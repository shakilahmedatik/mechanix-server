const express = require('express')
const router = express.Router()
const { list, add, read, update, remove } = require('../controllers/Service')

//GET SERVICES
router.get('/services', list)

//GET A SERVICE
router.get('/service/:id', read)

//POST A SERVICE
router.post('/service/add', add)

//UPDATE A SERVICE
router.put('/service/:id', update)

//REMOVE A SERVICE
router.delete('/service/:id', remove)

module.exports = router
