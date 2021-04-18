const mongoose = require('mongoose')

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
    status: {
      type: String,
      default: 'Pending',
      enum: ['Pending', 'Done'], // enum means string objects
    },
    paymentId: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Mechanics', mechanicSchema)
