const mongoose = require('mongoose');
const cryptoSchema = require('./crypto.schema.server');
module.exports = mongoose.model('CryptoModel', cryptoSchema);
