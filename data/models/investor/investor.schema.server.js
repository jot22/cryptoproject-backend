const mongoose = require('mongoose');
const investorSchema = mongoose.Schema({
    _id: Number,
    username: String,
    password: String,
    firstName: String,
    lastName: String
}, {collection: 'investor'});
module.exports = investorSchema;
