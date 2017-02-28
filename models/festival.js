var mongoose = require('mongoose');

var artistSchema = new mongoose.Schema({
  name: String,
  startTime: Date,
  endTime: Date
});

var dateSchema = new mongoose.Schema({
  stageName: String,
  stageArtist: [artistSchema],
  startDate: Date,
  endDate: Date,
})

var festivalSchema = new mongoose.Schema({
  title: String,
  date: [dateSchema],
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
