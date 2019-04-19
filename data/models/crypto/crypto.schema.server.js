const mongoose = require('mongoose');
const cryptoSchema = mongoose.Schema({
    _id: Number,
    company: String
}, {collection: 'crypto'});
module.exports = cryptoSchema;
