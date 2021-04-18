const mongoose = require('mongoose')

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

module.exports = mongoose.model('Mechanics', mechanicSchema)
