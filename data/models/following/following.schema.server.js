const mongoose = require('mongoose');

const followingSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, unique: true, required: true},
    newFollow: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    following: [{type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}],
}, {collection: 'following'});
module.exports = followingSchema;
