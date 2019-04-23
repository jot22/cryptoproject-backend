const mongoose = require('mongoose');
const cryptoSchema = require('./crypto.schema.server');
const cryptoModel = mongoose.model('CryptoModel', cryptoSchema);



createCrypto = (crypto) =>
    cryptoModel.create(crypto);

findCryptoById = cryptoId =>
    cryptoModel.findById(cryptoId);

findAllCrpyto = () =>
    cryptoModel.find();

updateCrypto = (id, crypto) =>
    cryptoModel
        .update({_id: id}, {$set: crypto});

deleteCrypto = id =>
    cryptoModel
        .remove({_id: id});

module.exports = {createCrypto, findCryptoById, findAllCrpyto, updateCrypto, deleteCrypto}
