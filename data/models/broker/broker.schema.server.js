const mongoose = require('mongoose');
const brokerSchema = mongoose.Schema({
    _id: Number,
    username: String,
    password: String,
    firstName: String,
    lastName: String
}, {collection: 'broker'});
module.exports = brokerSchema;
