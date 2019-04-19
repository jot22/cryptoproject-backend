const mongoose = require('mongoose');
const tradeSchema = mongoose.Schema({
    _id: Number,
    tokens: {type: Number, required: true},
    priceWhenBought: {type: Number, required: true},
    sold: Boolean,
    crypto: {type: Number, ref: 'CryptoModel'},
    investor: {type: Number, ref: 'InvestorModel'},
    broker: {type: Number, ref: 'BrokerModel'}
}, {collection: 'purchases'});
module.exports = tradeSchema;
