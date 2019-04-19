const mongoose = require('mongoose');
const purchaseSchema = mongoose.Schema({
    _id: Number,
    priceWhenBought: Number,
    cryptoOwner: {type: Number, ref: 'InvestorModel'},
    broker: {type: Number, ref: 'BrokerModel'}
}, {collection: 'purchases'});
module.exports = purchaseSchema;
