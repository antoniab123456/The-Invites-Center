const express = require('express');
const router = express.Router();
const config = require('../config/config');
const jwt = require('jsonwebtoken');
const helpers = require('../helpers').setUserInfo;
const authenticationController = require('../controllers/authentication');
const loginController = require('../controllers/login');
const registrationController = require('../controllers/registration');


router.post('/register', registrationController.registrationValidation);

router.get('/home', (req, res) => {
   res.render('home');
});


router.post('/login', loginController.passportAuthentication);

router.get("/logout", (req, res) =>{
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/');
});


router.get('/admin', authenticationController.ensureAuthenticated, authenticationController.adminAuth);

//router.post('/confirmation/:token', authController.emailConfirmation);


module.exports = router;
