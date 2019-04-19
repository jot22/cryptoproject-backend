const mongoose = require('mongoose');
const tradeModel = require('../data/models/trade/trade.model.server');
const tradeDao = require('../data/models/trade/trade.dao.server');

exports.buy = function (req, res) {
    tradeDao.buyCrypto(req.params.iid, req.params.bid, req.params.cid, {
        _id: req.body._id,
        tokens: req.body.tokens,
        priceWhenBought: req.body.priceWhenBought
    }).then(newTrade => res.json(newTrade))
};

exports.getAnswersByStudent = (req, res) => {
    universityDao.findAnswersByStudent(req.params.sid)
        .then(answers => res.json(answers))
};

exports.index = function (req, res) {
    tradeDao.findAllTrades()
        .then(trades => res.json(trades));
}
