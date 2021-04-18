const Admin = require('../models/Admin')

//Get All Mechanic
exports.list = (req, res) => {
  Admin.find().exec((err, admins) => {
    if (err) {
      return res.status(404).json({
        error: 'Admins not found',
      })
    } else {
      return res.status(200).json(admins)
    }
  })
}

//Check admin Admin
exports.check = (req, res) => {
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
}

//Add a Mechanic
exports.add = (req, res) => {
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
}

//Delete a admin
exports.remove = async (req, res) => {
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
}
