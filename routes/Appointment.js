const express = require('express')
const router = express.Router()
const {
  list,
  add,
  read,
  update,
  remove,
} = require('../controllers/Appointment')

//GET ALL APPOINTMENTS
router.get('/appointments', list)

//POST AN APPOINTMENTS
router.post('/appointment/add', add)

//GET A SINGLE APPOINTMENT
router.get('/appointment/:id', read)

//POST AN APPOINTMENTS
router.put('/appointment/:id', update)

//POST AN APPOINTMENTS
router.delete('/appointment/:id', remove)

module.exports = router
