const mongoose = require('mongoose');
const cryptoSchema = mongoose.Schema({
    name: String,
    symbol: String,
    listOfUsers: [{type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}]
}, {collection: 'crypto'});
module.exports = cryptoSchema;
