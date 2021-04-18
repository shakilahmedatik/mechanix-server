const mongoose = require('mongoose')

const serviceSchema = new mongoose.Schema(
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

module.exports = mongoose.model('Services', serviceSchema)
