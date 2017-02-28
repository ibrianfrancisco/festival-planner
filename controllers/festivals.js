var Festival = require('../models/festival');
// not necessary?
var ObjectId = require('mongoose').Schema.Types.ObjectId;
var User = require('../models/user');

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
  var user = User.findById(req.user._id, function(err, user) {
    Festival.create(req.body).then(newFestival => {
      user.festivals.push(newFestival._id);
      user.save(function(err) {
        if (err) {
          res.json('error')
        } else {
          res.status(201).json(newFestival);
        }
      })
    }).catch(err => res.status(400).json(err));

  });
}

function deleteFestival(req, res, next) {
  Festival.findByIdAndRemove(req.params.id)
  .then(deletedFest => {
    res.json(deletedFest);
  }).catch(err => res.status(400).json(err));
}
