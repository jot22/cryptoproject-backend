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
        name: req.body.name,
        symbol: req.body.symbol,
        listOfUsers: req.body.listOfUsers,

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
                name: req.body.name,
                symbol: req.body.symbol,
                listOfUsers: req.body.listOfUsers
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

