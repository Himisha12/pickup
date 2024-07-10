const express = require('express');
const router = express.Router();
const quoteForm = require('../controllers/quote-controller');
// const authControllers = require('../controllers/auth-controller')

router.route("/quote").post(quoteForm);

module.exports = router;