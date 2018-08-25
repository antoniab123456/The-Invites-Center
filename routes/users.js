const express = require('express');
const router = express.Router();
const login = require('../controllers/login');
const registration = require('../controllers/registration');
const authentication = require('../controllers/authentication');
const main = require('../controllers/main');


/*Ger requests  */
router.get('/home', main.getHome);
router.get('/logout', authentication.getLogout);
router.get('/admin', authentication.ensureAuthenticated, authentication.adminAuth);
router.get('/verify', registration.verifyEmail);
router.get('/change_pass', authentication.changePassword);
router.get('/*', main.notFound);

/* Post requests  */
router.post('/register', registration.postReg);
router.post('/login', login.postLogin);
router.post('/forgot', authentication.forgotPassword);
router.post('/change_pass', authentication.postPassChange);

module.exports = router;