const express = require('express')
const router = express.Router()
const { list, add } = require('../controllers/Reviews')

//GET REVIEWS
router.get('/reviews', list)

//POST A REVIEW
router.post('/review/add', add)

module.exports = router
