const mongoose = require('mongoose');
const userTypes = ["INVESTOR", "BROKER"];

const investorSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    type: {type: String, enum: userTypes, required: true},
    wallet: Number
}, {collection: 'users'});
module.exports = investorSchema;