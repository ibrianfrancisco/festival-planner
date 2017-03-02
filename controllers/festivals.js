var Festival = require('../models/festival');
// not necessary?
var ObjectId = require('mongoose').Schema.Types.ObjectId;
var User = require('../models/user');

module.exports = {
  getAllFestivals,
  getFestival,
  createFestival,
  deleteFestival,
  addStage,
  addAct
}

function getAllFestivals(req, res, next) {
  Festival.find({user: req.user._id}).exec().then(festivals => {
    res.json(festivals);
  }).catch(err => res.status(500).json(err));
}

function getFestival(req, res, next) {
  Festival.findById(req.params.id)
  .then(festival => {
    console.log('i did it');
    console.log(festival);
    res.json(festival);
  }).catch(err => res.status(500).json(err));
}

function createFestival(req, res, next) {
  var user = User.findById(req.user._id, function(err, user) {
    // Festival.create(req.body).then(newFestival => {
    //   user.festivals.push(newFestival._id);
    //   newFestival.user = user._id;
    //   newFestival.save();
    //   user.save(function(err) {
    //     if (err) {
    //       res.json('error')
    //     } else {
    //       res.status(201).json(newFestival);
    //     }
    //   })
    // }).catch(err => res.status(400).json(err));

    Festival.create({
      title: req.body.title,
      date: req.body.date,
      stageName: req.body.stageName,
      artistName: req.body.artistName,
      stageStartTime: req.body.actStartTime,
      stageEndTime: req.body.actEndTime
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
  // MARKER 1 - the req.params.id comes from the other MARKER 1 located in routes/api.js
  Festival.findById(req.params.id)
  .then(festival => {
    // change back to stages and in models
    festival.stage.push({
      // MARKER 2 - stageName is TRANSFERED TO the festival instance's stageName - req.body.stageName comes from festival-controller
      stageName: req.body.stageName
    });
    return festival.save();
  })
  .then(festival => {
    res.status(200).json(festival);
  });
}

/*  TO DELETE A SUB-DOCUMENT

festival.stages.remove(id)
where id is the id of the stage

then
festival.save()


festival.stages.id(stageId).acts.remove(actId)


*/

function addAct(req, res, next) {
  // assumes route of POST /api/stages/:id/acts
  // this findOne method will find a festival model's stage _id, then it will take that festival stage's _id
  //and push it into it's own acts array determing by what you want to put in it
  // THEN save that festival, and return it then do all that status stuff
  Festival.findOne({'stages._id': req.params.id})
  .then(festival => {
    festival.stages.id(req.params.id).acts.push({
      artistName: req.body.artistName,
      // So this whole new Date thing, when a user input the data from the input form or whatever, it'll save it to mlab as whatever it is.
      actStartTime: new Date(req.body.actStartTime),
      actEndTime: new Date(req.body.actEndTime)
    });
    return festival.save();
  })
  .then(festival => {
    res.status(200).json(festival);
  });
}
