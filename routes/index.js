
const express = require('express');
const router = express.Router();
const main = require('../controllers/main');

/* Get Routes */
router.get('/', main.getIndex);
router.get('/invitation', main.getInvite);


module.exports = router;
