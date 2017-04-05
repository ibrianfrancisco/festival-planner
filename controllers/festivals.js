var Festival = require('../models/festival');
var User = require('../models/user');

module.exports = {
  getAllFestivals,
  getFestival,
  createFestival,
  deleteFestival,
  addStage,
  deleteStage,
  addAct,
  deleteAct
}

function getAllFestivals(req, res, next) {
  Festival.find({user: req.user._id}).exec().then(festivals => {
    res.json(festivals);
  }).catch(err => res.status(500).json(err));
}

function getFestival(req, res, next) {
  Festival.findById(req.params.id)
  .then(festival => {
    res.json(festival);
  }).catch(err => res.status(500).json(err));
}

function createFestival(req, res, next) {
  var user = User.findById(req.user._id, function(err, user) {
    Festival.create({
      title: req.body.title,
      date: req.body.date
    }).then(newFestival => {
      user.festivals.push(newFestival._id);
      newFestival.user = user._id;
      newFestival.save();
      user.save(function(err) {
        if (err) {
          res.json('error')
        } else {
          res.status(201).json(newFestival);
        }
      }).catch(err => res.status(400).json(err));
    });
  });
}

function deleteFestival(req, res, next) {
  Festival.findByIdAndRemove(req.params.id)
  .then(deletedFest => {
    res.json(deletedFest);
  }).catch(err => res.status(400).json(err));
}

function addStage(req, res, next) {
  Festival.findById(req.params.id)
  .then(festival => {
    festival.stages.push({
      stageName: req.body.stageName
    });
    return festival.save();
  })
  .then(festival => {
    res.status(200).json(festival);
  });
}

function deleteStage(req, res, next) {
  Festival.findOne({'stages._id': req.params.id})
  .then(festival => {
    festival.stages.remove(req.params.id);
    return festival.save();
  })
  .then(festival => {
    res.status(200).json(festival);
  });
}

function addAct(req, res, next) {
  Festival.findOne({'stages._id': req.params.id})
  .then(festival => {
    festival.stages.id(req.params.id).acts.push({
      artistName: req.body.artistName,
      actStartTime: new Date(req.body.actStartTime),
      actEndTime: new Date(req.body.actEndTime)
    });
    return festival.save();
  })
  .then(festival => {
    res.status(200).json(festival);
  });
}

function deleteAct(req, res, next) {
  Festival.findOne({'stages._id': req.params.stageId})
  .then(festival => {
    festival.stages.forEach(function(stage) {
      stage.acts.remove(req.params.actId);
    })
    return festival.save()
    .then(festival => {
      res.status(200).json(festival);
    })
  }).catch(err => res.status(400).json(err));
}
