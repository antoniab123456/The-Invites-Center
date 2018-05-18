var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
const nodemailer = require('nodemailer');
var env = require('dotenv/config');



router.post('/register', (req, res) => {
    var email = req.body.email;
    var name = req.body.name;
    var username = req.body.username;
    var password = req.body.password;
    var passwordConfirm = req.body.passwordConfirm;

    const output = `<p>Please, click this link to confirm your email</p>
    <a href="/invitation"> test </a>
    `

    let transporter = nodemailer.createTransport({
      host: 'smtp.yandex.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    let mailOptions = {
      from: '"The Invitation Center" <whiteley555@yandex.ru>',
      to: email,
      subject: "Verify your e-mail",
      text: "Verification",
      html: output
      };

      transporter.sendMail(mailOptions, (error, info) => {
       if(error) {
         return console.log(error);
       }
       console.log('Email successfully sent: %s', info.messageId);
       console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      });
     //validation
    req.checkBody('email', 'Invalid e-mail').isEmail();
    req.checkBody('password', 'Password should be at least 6 symbols').isLength({min: 6});
    req.checkBody('passwordConfirm', 'Passwords are not equal').equals(req.body.password);
    req.checkBody('username', 'Username should be less than 22 symbols').isLength({max: 22});
     var errors = req.validationErrors();

    if(errors){
      res.render('index', {
        errors: errors
      });
  }
else {
      var newUser = new User({
        email: username,
        name: name,
        username: username,
        password:  password
      });
      User.createUser(newUser, (err, user) => {
        if (err) throw err;
        console.log(user);
      });
      req.flash('success_msg', 'You are registered! Verify your email to Login');
res.redirect('/');
    }
});

    router.get('/home', (req, res) => {
       res.render('home');
    });


passport.use(new LocalStrategy(
	function (username, password, done) {
		User.getUserByUsername(username, (err, user) => {
			if (err) throw err;
			if (!user) {
				return done(null, false, { message: 'Unknown User' });
			}
     User.comparePassword(password, user.password, (err, isMatch) => {
				if (err) throw err;
				if (isMatch) {
					return done(null, user);
				} else {
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


router.post('/login',
passport.authenticate('local', {successRedirect: '/users/home', failureRedirect:'/', failureFlash: true}),
(req, res) => {
   res.redirect('/users/home');
});

router.get("/logout", (req, res) =>{
  req.logout();
 req.flash('success_msg', 'You are logged out');
  res.redirect('/');
});


router.get('/admin', ensureAuthenticated, (req, res) =>{
    User.find({}, (err, users) => {
     if(err){
       res.flash('error_msg', "Oops, something went wrong");
       next;
     }
       res.render('admin', {users: users});
   });
});

//make them unable to see a certain page if not authenticated: state as the second parameter in router.get
function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else{
    req.flash('error_msg', "You are not logged in");
    res.redirect('/');
  }
}


module.exports = router;
