Crypto = require('../data/models/crypto/crypto.model.server');
const mongoose = require('mongoose');
const cryptoSchema = require('../data/models/crypto/crypto.schema.server');
const cryptoModel = mongoose.model('CryptoModel', cryptoSchema);
const cryptoDao = require('../data/models/crypto/crypto.dao.server');


exports.index = (req, res) =>{
    cryptoModel.find((err, crypto) => {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json(crypto);
    });
};

exports.new = (req, res) => {
    cryptoDao.createCrypto({
        _id: req.body._id,
        name: req.body.name,
        symbol: req.body.symbol,
        priceWhenLoaded: req.body.priceWhenLoaded,
        percentChange24: req.body.percentChange24,
        volume: req.body.volume,
        marketCap: req.body.mark
    }).then(newCrypto => res.json(newCrypto))
};

exports.delete = (req, res) => {
    cryptoModel.remove({
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

exports.update = (req, res) => {
    cryptoDao
        .updateCrypto(
            req.params.id,
            {
                _id: req.body._id,
                name: req.body.name,
                symbol: req.body.symbol,
                priceWhenLoaded: req.body.priceWhenLoaded,
                percentChange24: req.body.percentChange24,
                volume: req.body.volume,
                marketCap: req.body.mark
            })
        .then(status => {
            res.json({
                status: "success",
                message: status
            });
        });
};

exports.findById = (req, res) => {
    cryptoDao
        .findCryptoById(req.params.id)
        .then(foundCypto => {
            res.json(foundCypto)
        })
};

