const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()

//Initialize App
const app = express()
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

//Middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('dev'))
app.use(fileUpload())

//Service
const servicesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 64,
    },
    image: {
      img: Buffer,
      size: Number,
      contentType: String,
    },
    description: {
      type: String,
      required: true,
      maxlength: 300,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
      maxlength: 8,
    },
  },
  { timestamps: true }
)
const Services = mongoose.model('Services', servicesSchema)
//GET ALL SERVICE
app.get('/services', (req, res) => {
  let order = req.query.order ? req.query.order : 'asc'
  let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
  let limit = req.query.limit ? parseInt(req.query.limit) : 6

  Services.find()
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, services) => {
      if (err) {
        return res.status(400).json({
          error: 'Services not found',
        })
      }
      res.json(services)
    })
})

//GET A SERVICE
app.get('/service/:id', async (req, res) => {
  const id = req.params.id
  await Services.findById(id).exec((err, Services) => {
    if (err) {
      console.log('Error while reading a service', err)
      return res.status(404).json({
        error: 'Services not found',
      })
    }
    res.json(Services)
  })
})

//POST A SERVICE
app.post('/service/add', (req, res) => {
  const file = req.files.file
  const name = req.body.name
  const description = req.body.description
  const price = req.body.price
  const imgData = file.data
  const encImg = imgData.toString('base64')

  const image = {
    contentType: file.mimetype,
    size: file.size,
    img: Buffer.from(encImg, 'base64'),
  }
  const service = new Services({ name, description, image, price })

  service.save((err, service) => {
    if (err) {
      console.log('Error while adding a service', err)
      return res.status(404).json({
        error: 'Services Not Added',
      })
    } else {
      // saved!
      console.log('Service Saved')
      return res.status(200).send(service)
    }
  })
})

//UPDATE A SERVICE
app.put('/service/:id', async (req, res) => {
  const id = req.params.id
  const UpdatedService = req.body
  await Services.findByIdAndUpdate(id, UpdatedService).exec(err => {
    if (err) {
      console.log('Error while updating a service', err)
      return res.status(404).json({
        error: 'Service not found',
      })
    }
    res.status(200).send('Service Updated Successfully')
  })
})

//REMOVE A SERVICE
app.delete('/service/:id', async (req, res) => {
  const id = req.params.id

  await Services.findByIdAndRemove(id).exec(err => {
    if (err) {
      console.log('Error while deleting a service', err)
      return res.status(400).json({
        error: 'Service not found',
      })
    }
    res.status(200).send('Service Deleted Successfully')
  })
})

//Mechanics
const mechanicSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 64,
    },
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 128,
    },
    image: {
      img: Buffer,
      size: Number,
      contentType: String,
    },
  },
  { timestamps: true }
)

const Mechanics = mongoose.model('Mechanics', mechanicSchema)

//GET MECHANICS
app.get('/mechanics', (req, res) => {
  let order = req.query.order ? req.query.order : 'asc'
  let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
  let limit = req.query.limit ? parseInt(req.query.limit) : 6
  Mechanics.find()
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, mechanics) => {
      if (err) {
        return res.status(404).json({
          error: 'Mechanics not found',
        })
      } else {
        return res.status(200).json(mechanics)
      }
    })
})

//GET A MECHANIC
app.get('/mechanic/:id', async (req, res) => {
  const id = req.params.id
  await Mechanics.findById(id).exec((err, Mechanics) => {
    if (err) {
      console.log('Error while reading a mechanic', err)
      return res.status(404).json({
        error: 'Mechanics not found',
      })
    }
    res.json(Mechanics)
  })
})

//POST A MECHANIC
app.post('/mechanic/add', (req, res) => {
  const file = req.files.file
  const name = req.body.name
  const title = req.body.title
  const imgData = file.data
  const encImg = imgData.toString('base64')

  const image = {
    contentType: file.mimetype,
    size: file.size,
    img: Buffer.from(encImg, 'base64'),
  }
  const mechanic = new Mechanics({ name, title, image })

  mechanic.save((err, mechanic) => {
    if (err) {
      console.log('Error while adding a mechanic', err)
      return res.status(404).json({
        error: 'Mechanics Not Added',
      })
    } else {
      // saved!
      console.log('Mechanic Saved')
      return res.status(200).send(mechanic)
    }
  })
})

//UPDATE A MECHANIC
app.put('/mechanic/:id', async (req, res) => {
  const id = req.params.id
  const UpdatedService = req.body
  await Mechanics.findByIdAndUpdate(id, UpdatedService).exec(err => {
    if (err) {
      console.log('Error while updating a mechanic', err)
      return res.status(404).json({
        error: 'Mechanic not found',
      })
    }
    res.status(200).send('Mechanic Updated Successfully')
  })
})

//REMOVE A MECHANIC
app.delete('/mechanic/:id', async (req, res) => {
  const id = req.params.id

  await Mechanics.findByIdAndRemove(id).exec(err => {
    if (err) {
      console.log('Error while deleting a mechanic', err)
      return res.status(400).json({
        error: 'Mechanic not found',
      })
    }
    res.status(200).send('Mechanic Deleted Successfully')
  })
})

//Reviews

const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 64,
    },
    car: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 300,
    },
  },
  { timestamps: true }
)

const Reviews = mongoose.model('Reviews', reviewSchema)

//GET REVIEWS
app.get('/reviews', (req, res) => {
  let order = req.query.order ? req.query.order : 'asc'
  let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
  let limit = req.query.limit ? parseInt(req.query.limit) : 6
  Reviews.find()
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, reviews) => {
      if (err) {
        return res.status(404).json({
          error: 'Reviews not found',
        })
      } else {
        return res.status(200).json(reviews)
      }
    })
})

//POST A REVIEW
app.post('/review/add', (req, res) => {
  const name = req.body.name
  const car = req.body.car
  const description = req.body.description

  const review = new Reviews({ name, car, description })
  review.save((err, review) => {
    if (err) {
      console.log('Error while adding a review', err)
      return res.status(404).json({
        error: 'Reviews Not Added',
      })
    } else {
      // saved!
      console.log('Review Saved')
      return res.status(200).send(review)
    }
  })
})

//Admin
const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
)

const Admin = mongoose.model('Admin', adminSchema)

//GET MECHANICS
app.get('/admin', (req, res) => {
  Admin.find().exec((err, admins) => {
    if (err) {
      return res.status(404).json({
        error: 'Admins not found',
      })
    } else {
      return res.status(200).json(admins)
    }
  })
})

//CHECK MECHANICS
app.post('/admin/check', (req, res) => {
  const email = req.body.email
  Admin.find({ email: email }).exec((err, admins) => {
    if (err) {
      return res.status(404).json({
        error: 'Admins not found',
      })
    } else {
      return res.status(200).json(admins.length > 0)
    }
  })
})

//POST A MECHANIC
app.post('/admin/add', (req, res) => {
  const email = req.body.email
  const admin = new Admin({ email })

  admin.save((err, admin) => {
    if (err) {
      console.log('Error while adding an admin', err)
      return res.status(404).json({
        error: 'admin Not Added',
      })
    } else {
      // saved!
      console.log('admin Saved')
      return res.status(200).send(admin)
    }
  })
})

//REMOVE A MECHANIC
app.delete('/admin/:id', async (req, res) => {
  const id = req.params.id

  await Admin.findByIdAndRemove(id).exec(err => {
    if (err) {
      console.log('Error while deleting the admin', err)
      return res.status(400).json({
        error: 'admin not found',
      })
    }
    res.status(200).send('admin Deleted Successfully')
  })
})

const appointmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 64,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    service: {
      type: String,
      trim: true,
      required: true,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
    },
    status: {
      type: String,
      default: 'Pending',
    },

    // paymentId: {
    //   type: String,
    //   trim: true,
    //   required: true,
    // },
  },
  { timestamps: true }
)

//Appointment
const Appointment = mongoose.model('Appointment', appointmentSchema)

//GET ALL APPOINTMENTS
app.get('/appointments', (req, res) => {
  const email = req.query.email

  Admin.find({ email: email }).exec((err, admins) => {
    if (err) {
      return res.status(404).json({
        error: 'Admins not found',
      })
    } else {
      if (admins.length > 0) {
        Appointment.find().exec((err, appointments) => {
          if (err) {
            return res.status(400).json({
              error: 'Appointments not found',
            })
          }
          return res.json(appointments)
        })
      } else {
        Appointment.find({ email: email }).exec((err, appointments) => {
          if (err) {
            return res.status(400).json({
              error: 'Appointments not found',
            })
          }
          return res.json(appointments)
        })
      }
    }
  })
})

//POST AN APPOINTMENTS
app.post('/appointment/add', (req, res) => {
  const name = req.body.name
  const email = req.body.email
  const service = req.body.service
  const price = req.body.price

  const appointment = new Appointment({ name, email, service, price })

  appointment.save((err, appointment) => {
    if (err) {
      console.log('Error while adding the appointment', err)
      return res.status(404).json({
        error: 'Appointment Not Added',
      })
    } else {
      // saved!
      console.log('Appointment Saved')
      return res.status(200).send(appointment)
    }
  })
})

//UPDATE STATUS
app.put('/appointment/status/:id', async (req, res) => {
  const id = req.params.id
  const updatedAppointment = req.body
  await Appointment.findByIdAndUpdate(id, updatedAppointment).exec(err => {
    if (err) {
      console.log('Error while updating the appointment', err)
      return res.status(404).json({
        error: 'Appointment not found',
      })
    }
    res.status(200).send('status updated successfully')
  })
})

//DELETE AN APPOINTMENTS
app.delete('/appointment/:id', async (req, res) => {
  const id = req.params.id

  await Appointment.findByIdAndRemove(id).exec((err, appointments) => {
    if (err) {
      console.log('Error while deleting the appointment', err)
      return res.status(400).json({
        error: 'Appointment not found',
      })
    }
    res.status(200).send('Appointment Deleted Successfully')
  })
})

//Connect Database
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('Connected to mongoDB...'))
  .catch(err => console.error(err))

//Initialize Server
const port = process.env.PORT || 8000

app.listen(port, () => {
  console.log(`Server is running on ${port}`)
})
