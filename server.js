var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passport = require('passport');
var LocalStrategy = require('passport-local');
var session = require('express-session');

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
function(email, password, done) {
  User.findOne({email: email, password: password}, function(err, user) {
    if (err) {
      return done(new Error("No user found with those credentials"));
    }
    return done(null, user);
  });
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  })
});

mongoose.connect('mongodb://localhost/demo-ng-passport');

var User = mongoose.model('User', new Schema({
  email: { type: String },
  password: { type: String }
}));


var app = express();
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());
app.use(session({secret: 'somethingreallyawesome$$$'}));
app.use(passport.initialize());
app.use(passport.session());

var authenticateUser = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (!user) {
      return res.status(401).end();
    }
    req.logIn(user, function(err) {
      return res.status(200).end();
    });
  })(req, res, next);
}

//login API endpoint
app.post('/api/auth', authenticateUser);
app.post('/api/logout', function(req, res) {
  req.logout();
  return res.status(200).end();
});

//signup API endpoint
app.post('/api/user', function(req, res) {
  var u = new User({email: req.body.email, password: req.body.password});
  u.save(function(err, user) {
    return res.json({success: true});
  })
});


var requireAuth = function(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(401).end();
  }
  next();
};
app.get('/api/user/me', requireAuth, function(req, res) {
  return res.json(req.user);
});

app.listen(8888);
