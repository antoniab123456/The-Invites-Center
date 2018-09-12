const express = require('express');
const router = express.Router();
const login = require('../controllers/login');
const registration = require('../controllers/registration');
const authentication = require('../controllers/authentication');
const main = require('../controllers/main');
const settings = require('../controllers/settings');
const conversation = require('../controllers/conversation');
const upload = require('../config/uploads');


/* Test routes */
router.get('/test/', main.Test);

/*Get requests  */
router.get('/home', main.getHome);
router.get('/logout', authentication.getLogout);
router.get('/verify', registration.verifyEmail);
router.get('/change_pass', authentication.changePassword);
router.get('/profile', authentication.ensureAuthenticated, settings.getProfile);
router.get('/settings', authentication.ensureAuthenticated, settings.getSettings);
router.get('/image/', settings.getImage);
router.get('/find_user', main.getUser);
router.get('/get_users', main.getUsers);
router.get('/*', main.notFound);

/* Post requests  */
router.post('/register', registration.postReg);
router.post('/login', login.postLogin);
router.post('/forgot', authentication.forgotPassword);
router.post('/change_pass', authentication.postPassChange);
router.post('/profile/picture', authentication.ensureAuthenticated, upload.single('file'), settings.postProfilePicture);
router.post('/conversation/', conversation.postConversation);
router.post('/chats/history', conversation.chatHistory);

/* Delete requests */
router.delete('/image/delete', settings.deleteImage);


module.exports = router;