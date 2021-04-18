const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const morgan = require('morgan')
const homeRoutes = require('./routes/Home')
const serviceRoutes = require('./routes/Services')
const mechanicRoutes = require('./routes/Mechanics')
const reviewRoutes = require('./routes/Reviews')
const adminRoutes = require('./routes/Admin')
const appointmentRoutes = require('./routes/Admin')
require('dotenv').config()

//Initialize App
const app = express()

//Middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('dev'))
app.use(fileUpload())

//Routes middleware
app.use('/', homeRoutes)
app.use('/api', serviceRoutes)
app.use('/api', mechanicRoutes)
app.use('/api', reviewRoutes)
app.use('/api', adminRoutes)
app.use('/api', appointmentRoutes)

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
