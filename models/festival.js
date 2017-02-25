var mongoose = require('mongoose');

var artistSchema = new mongoose.Schema({
  name: String,
  startTime: Date,
  endTime: Date
});

var dateSchema = new mongoose.Schema({
  stageName: [String],
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
