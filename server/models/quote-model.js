const { Schema, model } = require("mongoose");
const { object } = require("zod");

const quoteSchema = new Schema({
    shipmentType: { type: String, required: true },
    orderType: { type: String, required: true },
    originPort: { type: String, required: true },
    pickupTime: { type: String },
    multipleLocation: { type: String, required: true },
    accountManager: { type: String, required: true },
    customerName: { type: String, required: true },
    pickAddress: { type: String },
    city: { type: String },
    zipCode: { type: String },
    remark: { type: String },
    contactPersonName: { type: String },
    contactPersonNumber: { type: String },
    scheduledPickupDate: { type: Date },
    expectedArrivalDate: { type: Date },
    dropContactPersonName: { type: String },
    dropContactPersonNumber: { type: String },
    box: { type: String, required: true },
    weight: { type: String, required: true },
    CBM: { type: String, required: true },
    file: { type: Object, required: true },
});

const Quote = model("Quote", quoteSchema);
module.exports = Quote;

