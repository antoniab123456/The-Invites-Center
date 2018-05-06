var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');




router.post('/register', function(req, res){
    var email = req.body.email;
    var name = req.body.name;
    var username = req.body.username;
    var password = req.body.password;
    var passwordConfirm = req.body.passwordConfirm;

     //validation
    req.checkBody('email', 'Invalid e-mail').isEmail();
    req.checkBody('password', 'Password should be at least 6 symbols').isLength({min: 6});
   req.checkBody('passwordConfirm', 'Passwords are not equal').equals(req.body.password);

     var errors = req.validationErrors();

    if(errors){
      res.render('index', {
        errors: errors
      });
  }
else {
      var newUser = new User({
        name: name,
        email: email,
        username: username,
        password:  password
      });
      User.createUser(newUser, function(err, user) {
        if (err) throw err;
        console.log(user);
      });
      req.flash('success_msg', 'You are registered');
res.redirect('/');
    }

  });

    router.get('/home', function(req, res){
       res.render('home');
    });


passport.use(new LocalStrategy(
	function (username, password, done) {
		User.getUserByUsername(username, function (err, user) {
			if (err) throw err;
			if (!user) {
				return done(null, false, { message: 'Unknown User' });
			}

			User.comparePassword(password, user.password, function (err, isMatch) {
				if (err) throw err;
				if (isMatch) {
					return done(null, user);
				} else {
					return done(null, false, { message: 'Invalid password' });
				}
			});
		});
	}));

passport.serializeUser(function(user, done) {
   done(null, user.id);
});


passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
  });


router.post('/login',
passport.authenticate('local', {successRedirect: '/users/home', failureRedirect:'/', failureFlash: true}),
function(req, res){
   res.redirect('/users/home');
});

router.get("/logout", function(req, res){
  req.logout();
 req.flash('success_msg', 'You are logged out');
  res.redirect('/');
});

function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else{
    req.flash('error_msg', "You are not logged in");
    res.redirect('/users/login');
  }
}


module.exports = router;
