var express = require('express');
var router = express.Router();

router.post('/register', function(req, res){
    var email = req.body.email;
    var name = req.body.name;
    var surname = req.body.surname;
    var password = req.body.password;
    var passwordConfirm = req.body.passwordConfirm;

     //validation
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is empty').isEmail();
    req.checkBody('name', 'Name is not filled').notEmpty();
    req.checkBody('surname', 'Surname is not filled').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password', 'Password should be at least 6 symbols').isLength({min: 6});
   req.checkBody('confirmPassword', 'Passwords are not equal').equals(req.body.password);

    var errors = req.validationErrors();

    if(errors){
      res.render('index', {
        errors: errors
      });
    } else {
      console.log('PASSED');
    }
  });

    router.get('/home', function(req, res){
       res.render('home');
    });



module.exports = router;
