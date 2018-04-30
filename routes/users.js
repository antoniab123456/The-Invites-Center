var express = require('express');
var router = express.Router();

router.get('/register', function(req, res){
    res.render('register');
  });

    router.get('/home', function(req, res){
       res.render('home');
    });



module.exports = router;
