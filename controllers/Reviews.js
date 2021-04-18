const Reviews = require('../models/Review')

//Get All Review
exports.list = (req, res) => {
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
}

//Add a Review
exports.add = (req, res) => {
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
}
