const express = require('express');
const router = express.Router();
const main = require('../controllers/main');


/* Get requests */
router.get('/', main.notFound);

module.exports = router;