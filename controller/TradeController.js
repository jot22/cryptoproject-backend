const mongoose = require('mongoose');
const tradeModel = require('../data/models/trade/trade.model.server');
const tradeDao = require('../data/models/trade/trade.dao.server');

exports.buy = function (req, res) {
    tradeDao.buyCrypto(req.params.iid, req.params.bid, req.params.cid, {
        tokens: req.body.tokens,
        priceWhenBought: req.body.priceWhenBought,
        sold: false,
        status: req.body.status
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

exports.findTradeByCrypto = function(req, res) {
    tradeDao.findTradesByCrypto(req.params.cid)
        .then(trades => res.json(trades));
};

exports.sell = (req, res) => {
    tradeDao.findTradeById(req.params.cid).then(trade =>
        tradeDao
            .sellCrypto(
                req.params.id, {
                    _id: trade._id,
                    tokens:  trade.tokens,
                    priceWhenBought: trade.priceWhenBought,
                    sold: true,
                    status: trade.status,
                    crypto: trade.crypto,
                    investor: trade.investor,
                    broker: trade.breakAfter
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
