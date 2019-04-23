const mongoose = require('mongoose');
const userTypes = ["INVESTOR", "BROKER", ""];

const investorSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    type: {type: String, enum: userTypes},
    wallet: Number,
    broker: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}
}, {collection: 'users'});
module.exports = investorSchema;
