const mongoose = require('mongoose');
const answerSchema = mongoose.Schema({
    _id: Number,
    company: String
}, {collection: 'crypto'});
module.exports = answerSchema;
