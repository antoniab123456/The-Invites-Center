var express = require('express');
var router = express.Router();
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



module.exports = router;
