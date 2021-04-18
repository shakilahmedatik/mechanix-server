const express = require('express')
const router = express.Router()
const { list, add, read, update, remove } = require('../controllers/Mechanics')

//GET MECHANICS
router.get('/mechanics', list)

//GET A MECHANIC
router.get('/mechanic/:id', read)

//POST A MECHANIC
router.post('/mechanic/add', add)

//UPDATE A MECHANIC
router.put('/mechanic/:id', update)

//REMOVE A MECHANIC
router.delete('/mechanic/:id', remove)

module.exports = router
