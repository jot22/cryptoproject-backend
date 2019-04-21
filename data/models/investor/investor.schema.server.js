const mongoose = require('mongoose');
const investorSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    wallet: Number
}, {collection: 'investor'});
module.exports = investorSchema;
