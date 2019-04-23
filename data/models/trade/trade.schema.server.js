const mongoose = require('mongoose');
const status = ["PENDING", "PROCESSED"];

const tradeSchema = mongoose.Schema({
    tokens: {type: Number, required: true},
    priceWhenBought: {type: Number, required: true},
    sold: Boolean,
    status: {type: String, enum: status, required: true},
    crypto: Number,
    investor: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    broker: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}
}, {collection: 'purchases'});
module.exports = tradeSchema;
