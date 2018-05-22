
var express = require('express');
var router = express.Router();

//connecting to the view called index through "/" , getting the home page
router.get('/', (req, res) => {
    res.render('index');
  });

  router.get('/invitation', (req,res) => {
    res.render('invitation');
  });


  module.exports = router;
