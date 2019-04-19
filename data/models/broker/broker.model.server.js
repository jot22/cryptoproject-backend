const mongoose = require('mongoose');
const brokerSchema = require('./broker.schema.server');
module.exports = mongoose.model('BrokerModel', brokerSchema);
