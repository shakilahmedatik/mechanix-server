const Mechanics = require('../models/Mechanic')

//Get All Mechanic
exports.list = (req, res) => {
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
}

//Add a Mechanic
exports.add = (req, res) => {
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
}

//Get a Mechanic
exports.read = async (req, res) => {
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
}

//Delete a Mechanic
exports.remove = async (req, res) => {
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
}

//Update Mechanic
exports.update = async (req, res) => {
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
}
