const express = require('express');
const router = express.Router();
const quoteForm = require('../controllers/quote-controller');
const getQuotes = require('../controllers/get-quotes-controller');

router.route("/quote").post(quoteForm);
router.route("/quotes").get(getQuotes);

module.exports = router;
