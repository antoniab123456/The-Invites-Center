const express = require('express');
const User = require('../models/user');

exports.ensureAuthenticated = (req, res, next) => {
  if(req.isAuthenticated()){
    return next();
  } else{
    req.flash('error_msg', "You are not logged in");
    res.redirect('/');
  }
}

exports.adminAuth = (req, res) =>{
    User.find({}, (err, users) => {
     if(err){
       res.flash('error_msg', "Oops, something went wrong");
       next;
     }
       res.render('admin', {users: users});
   });
}