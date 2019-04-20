const mongoose = require('mongoose');
const cryptoSchema = mongoose.Schema({
    _id: Number,
    name: String,
    symbol: String,
    priceWhenLoaded: Number,
    percentChange24: Number,
    volume: Number,
    marketCap: Number
}, {collection: 'crypto'});
module.exports = cryptoSchema;
