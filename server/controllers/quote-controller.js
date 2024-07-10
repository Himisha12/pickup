const multer = require('multer');
const Quote = require("../models/quote-model");

const quoteForm = async (req, res) => {
    try {
        const response = req.body;
        await Quote.create(response);
        return res.status(200).json({ message: "form sent successfully" });
    } catch (error) {
        console.log(`error ${error}`);
        return res.status(500).json({ message: "form not delivered" });
    }
}

module.exports = quoteForm;
