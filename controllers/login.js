const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

exports.passportAuthentication = passport.authenticate('local', {successRedirect: '/users/home', failureRedirect:'/', failureFlash: true}),
(req, res) => {
   res.redirect('/users/home');
}
const localOptions = {
   usernameField: 'email'
};

passport.use(new LocalStrategy(
	function (email, password, done) {
		User.getUserByUsername(email, (err, user) => {
			 if (err) throw err;
			 if (!user) {
			  	return done(null, false, { message: 'Unknown User' });
			 }
      //if (user.confirmed === false) {
      //return done(null, false, { message:'Please confirm your email to login' });
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
