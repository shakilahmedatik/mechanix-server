const Services = require('../models/service')

//Get All Service
exports.list = (req, res) => {
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
}

//Add a Service
exports.add = (req, res) => {
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
}

//Get a Service
exports.read = async (req, res) => {
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
}

//Delete a Service
exports.remove = async (req, res) => {
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
}

//Update Service
exports.update = async (req, res) => {
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
}
