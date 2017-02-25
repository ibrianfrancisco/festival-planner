var mongoose = require('mongoose');

var artistSchema = new mongoose.Schema({
  name: String,
  startTime: Date,
  endTime: Date
});

var festivalSchema = new mongoose.Schema({
  title: String,
  stageName: [String],
  stageArtist: [artistSchema],
  date: Date,
  startDate: Date,
  endDate: Date,
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Festival', festivalSchema);
