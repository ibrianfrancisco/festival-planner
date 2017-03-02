var mongoose = require('mongoose');

var actSchema = new mongoose.Schema({
  artistName: String,
  actStartTime: Date,
  actEndTime: Date
});

var stageSchema = new mongoose.Schema({
  stageName: String,
  acts: [actSchema]
})

var festivalSchema = new mongoose.Schema({
  title: String,
  date: Date,
  stage: [stageSchema],
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Festival', festivalSchema);
