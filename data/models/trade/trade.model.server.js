const mongoose = require('mongoose');
const tradeSchema = require('./trade.schema.server');
module.exports = mongoose.model('TradeModel', tradeSchema);
