const mongoose = require('mongoose');
const tradeSchema = require('./trade.schema.server');
const tradeModel = mongoose.model('TradeModel', tradeSchema);

buyCrypto = (investorId, brokerId, cryptoId, purchase) => {
    var newPurchase = {
        tokens: purchase.tokens,
        priceWhenBought: purchase.priceWhenBought,
        sold: purchase.sold,
        status: purchase.status,
        crypto: cryptoId,
        investor: investorId,
        broker: brokerId
    };
    return tradeModel.create(newPurchase);
};

sellCrypto = (id, crypto) =>
    tradeModel.update({_id: id}, {$set: crypto});

deleteCrypto = (id) =>
    tradeModel.remove({_id: id});

updateTrade = (id, crypto) =>
    tradeModel
        .update({_id: id}, {$set: crypto});

findTradeById = tradeId =>
    tradeModel.findById(tradeId);

findAllTrades = () =>
    tradeModel.find()
        .populate('crypto', 'name -_id')
        .populate('broker', 'username -_id')
        .populate('investor', 'username -_id');

findTradesByInvestor = (investorId) =>
    tradeModel.find().then(trades => trades.filter(trade => investorId == trade.investor));

findTradesByBroker = (brokerId) =>
    tradeModel.find().then(trades => trades.filter(trade => brokerId == trade.broker));

findTradesByCrypto = (cryptoId) =>
    tradeModel.find().then(trades => trades.filter(trade => cryptoId == trade.crypto));

module.exports = {
    buyCrypto, updateTrade, findTradesByCrypto, findAllTrades, findTradesByInvestor,
    findTradesByBroker, sellCrypto, findTradeById, deleteCrypto
};
