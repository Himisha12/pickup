const Quote = require("../models/quote-model");

const getQuotes = async (req, res) => {
    try {
        const quotes = await Quote.find({});
        return res.status(200).json(quotes);
    } catch (error) {
        console.log(`error ${error}`);
        return res.status(500).json({ message: "failed to fetch quotes" });
    }
}

module.exports = getQuotes;
