const express = require('express');
const router = express.Router();
const quoteForm = require('../controllers/quote-controller');

router.route("/quote").post(quoteForm);

module.exports = router;
