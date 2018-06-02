const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authenticationController = require('../controllers/authentication');
const loginController = require('../controllers/login');
const registrationController = require('../controllers/registration');
const passport = require('passport');
const env = require('dotenv/config');
const User = require('../models/user');

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


/*router.get('/confirmation/:token', async (req, res, next) => {
    try {
        var { user: { id } } = jwt.verify(req.params.token, REG_SECRET);
        await models.User.update({confirmed: true }, { where: { id } });
      } catch (e) {
        res.status('404');
      }
     var login = " Your email is verified!"
     return res.render('index', {login: login});
});*/



//router.post('/generate/invitation',  authenticationController.generateLink);

module.exports = router;
