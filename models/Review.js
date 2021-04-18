const mongoose = require('mongoose')

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

module.exports = mongoose.model('Reviews', reviewSchema)
