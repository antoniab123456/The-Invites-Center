const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const env = require('dotenv/config');
const jwt = require('jsonwebtoken');


exports.passportAuthentication = passport.authenticate('local', {successRedirect: '/users/home', failureRedirect:'/', failureFlash: true}),
(req, res) => {
   res.redirect('/users/home');
}

passport.use(new LocalStrategy(
	function (email, password, done) {
		User.getUserByUsername(email, (err, user) => {
			 if (err) throw err;
			 if (!user) {
			  	return done(null, false, { message: 'Unknown User' });
       }
      // if(!user.confirmed){
        //return done(null, false, { message: 'Email is not verified'});
       //}
            User.comparePassword(password, user.password, (err, isMatch) => {
          if (err) throw err;
            if (isMatch) {
                return done(null, user);
              } else  {
                  return done(null, false, { message: 'Invalid password' });
                }
             });
	  });
}));


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
   User.getUserById(id, (err, user) => {
      done(err, user);
   });
});


