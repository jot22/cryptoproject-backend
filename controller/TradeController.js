const mongoose = require('mongoose');
const tradeModel = require('../data/models/trade/trade.model.server');
const tradeDao = require('../data/models/trade/trade.dao.server');

exports.buy = function (req, res) {
    tradeDao.buyCrypto(req.params.iid, req.params.bid, req.params.cid, {
        _id: req.body._id,
        tokens: req.body.tokens,
        priceWhenBought: req.body.priceWhenBought,
        sold: false
    }).then(newTrade => res.json(newTrade))
};

exports.index = function (req, res) {
    tradeDao.findAllTrades()
        .then(trades => res.json(trades));
};

exports.findTradesByInvestor = function(req, res) {
    tradeDao.findTradesByInvestor(req.params.iid)
        .then(trades => res.json(trades));
};

exports.findTradesByBroker = function(req, res) {
    tradeDao.findTradesByBroker(req.params.bid)
        .then(trades => res.json(trades));
};

exports.sell = (req, res) => {
    tradeDao.findTradeById(req.params.cid).then(crypto =>
        tradeDao
            .sellCrypto(
                req.params.id, {
                    _id: crypto._id,
                    tokens:  crypto.tokens,
                    priceWhenBought: crypto.priceWhenBought,
                    sold: true,
                    crypto: crypto.crypto,
                    investor: crypto.investor,
                    broker: crypto.breakAfter
                }).then(status => {
            res.json({
                status: "success",
                message: status
            });
        }));
};

exports.removeCrypto = (req, res) => {
    tradeModel.remove({
        _id: req.params.id
    }, (err, crypto) =>{
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Crypto deleted'
        });
    });
};
