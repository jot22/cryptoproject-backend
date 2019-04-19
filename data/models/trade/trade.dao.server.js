const mongoose = require('mongoose');
const tradeSchema = require('./trade.schema.server');
const tradeModel = mongoose.model('TradeModel', tradeSchema);

buyCrypto = (investorId, brokerId, cryptoId, purchase) => {
    var newPurchase = {
        _id: purchase._id,
        tokens: purchase.tokens,
        priceWhenBought: purchase.priceWhenBought,
        crypto: cryptoId,
        investor: investorId,
        broker: brokerId
    };
    return tradeModel.create(newPurchase);
};

findAllTrades = () =>
    tradeModel.find()
        .populate('crypto', 'company -_id')
        .populate('broker', 'username -_id')
        .populate('investor', 'username -_id');

module.exports = {buyCrypto, findAllTrades};
