const mongoose = require('mongoose');
const followingSchema = require('./following.schema.server');
module.exports = mongoose.model('FollowingModel', followingSchema);
