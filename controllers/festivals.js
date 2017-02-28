var Festival = require('../models/festival');
// not necessary?
var ObjectId = require('mongoose').Schema.Types.ObjectId;

module.exports = {
  getAllFestivals,
  createFestival,
  deleteFestival
}

function getAllFestivals(req, res, next) {
  console.log('Get All Triggered');
  Festival.find({user: req.user._id}).exec().then(festivals => {
    res.json(festivals);
    // console.log(festivals)
  }).catch(err => res.status(500).json(err));
}

function createFestival(req, res, next) {
  console.log('create triggered');
  // req.body.user = req.user._id;
  Festival.create(req.body).then(newFestival => {
    req.user.festivals.push(newFestival._id);
    // not saving to user
    console.log(req.user);
    res.status(201).json(newFestival);
  }).catch(err => res.status(400).json(err));
}

function deleteFestival(req, res, next) {
  Festival.findByIdAndRemove(req.params.id)
  .then(deletedFest => {
    res.json(deletedFest);
  }).catch(err => res.status(400).json(err));
}
