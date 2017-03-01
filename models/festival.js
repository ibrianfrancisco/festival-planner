var mongoose = require('mongoose');

var artistSchema = new mongoose.Schema({
  artistName: String,
  actStartTime: Date,
  actEndTime: Date
});

var stageSchema = new mongoose.Schema({
  stageName: String,
  stageArtist: [artistSchema],
  stageStartTime: Date,
  stageEndTime: Date,
})

var festivalSchema = new mongoose.Schema({
  title: String,
  stage: [stageSchema],
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Festival', festivalSchema);

// var mongoose = require('mongoose');

// var artistSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   startTime: {
//     type: Date,
//     required: true
//   },
//   endTime: {
//     type: Date,
//     required: true
//   }
// });

// var stageSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   artist: [artistSchema]
// });

// var festivalSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true
//   },
//   startDate: {
//     type: Date,
//     required: true
//   },
//   endDate: {
//     type: Date,
//     required: true
//   },
//   stage: [stageSchema],
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User'
//   }
// });

// module.exports = mongoose.model('Festival', festivalSchema);
