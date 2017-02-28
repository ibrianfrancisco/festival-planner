var User = require('../models/user');
var jwt = require('jsonwebtoken');
var SECRET = process.env.SECRET;

// refactor the token thing by including auth from config

module.exports = {
  create,
  login,
  logout,
  me
};

function create(req, res, next) {
  User.create(req.body).then(user => {
    var token = jwt.sign({
      user: user
    }, SECRET, {expiresIn: '24h'});
    // send token to client in Authorization header
    res.set('Authorization', token);
    res.json({msg: 'logged in successfully'});
  }).catch( err => res.status(400).json(err) );
}

function login(req, res, next) {
  User.findOne({email: req.body.email}).exec().then(user => {
    if (!user) return res.status(401).json({err: 'bad credentials'});
    user.comparePassword(req.body.password, function(err, isMatch) {
      if (isMatch) {
        // jwt.sign is our payload and what we're transferring. look at image
        var token = jwt.sign({
          user: user
        }, SECRET, {expiresIn: '24h'});
        // send token to client in Authorization header
        res.set('Authorization', token);
        res.json({msg: 'logged in successfully'});
      } else {
        return res.status(401).json({err: 'bad credentials'});
      }
    });
  }).catch(err => res.status(401).json(err));
}

function logout(req, res, next) {
  req.session.userId = null;
  res.status(200).json({});
}

// Called by client to get logged in user doc
// Won't be needed with JWT auth
function me(req, res, next) {
  res.json(req.user);
}
