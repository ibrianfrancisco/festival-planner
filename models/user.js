var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

const SALT_ROUNDS = 6;

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
  password: {
    type: String,
    required: true
  },
  festival: [{type: mongoose.Schema.Types.ObjectId, ref:"Festival"}]
});

userSchema.pre('save', function(next) {
  var user = this;
  // if password has not been modifed is what this is saying, call next.
  if (!user.isModified('password')) return next();
  // password has been changed - salt and hash it
  bcrypt.hash(user.password, SALT_ROUNDS, function(err, hash) {
    if (err) return next(err);
    // override the user provided password with the hash
    user.password = hash;
    next();
  });
});

// there are a methods object on schemas, so this is how we created custom methods
userSchema.methods.comparePassword = function(tryPassword, cb) {
  bcrypt.compare(tryPassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  })
}

module.exports = mongoose.model('User', userSchema);