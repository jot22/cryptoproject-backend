const mongoose = require('mongoose');
const userTypes = ["INVESTOR", "BROKER", ""];

const investorSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    phone: Number,
    email: String,
    type: {type: String, enum: userTypes},
    wallet: Number,
    broker: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    clients: [{type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}],
    following: [{type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}]
}, {collection: 'users'});
module.exports = investorSchema;
