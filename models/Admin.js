const mongoose = require('mongoose')

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

module.exports = mongoose.model('Admin', adminSchema)
