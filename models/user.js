var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  festival: [{type: Schema.Types.ObjectId, ref:"Festival"}]
});

module.exports = mongoose.model('User', userSchema);
