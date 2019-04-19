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

sellCrypto = (id, crypto) =>
    tradeModel.update({_id: id}, {$set: crypto});


findTradeById = tradeId =>
    tradeModel.findById(tradeId);

findAllTrades = () =>
    tradeModel.find()
        .populate('crypto', 'company -_id')
        .populate('broker', 'username -_id')
        .populate('investor', 'username -_id');

findTradesByInvestor = (investorId) =>
    tradeModel.find().then(trades => trades.filter(trade => investorId == trade.investor));

findTradesByBroker = (brokerId) =>
    tradeModel.find().then(trades => trades.filter(trade => brokerId == trade.broker));

module.exports = {buyCrypto, findAllTrades, findTradesByInvestor, findTradesByBroker, sellCrypto, findTradeById};