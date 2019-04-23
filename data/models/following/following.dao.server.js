const mongoose = require('mongoose');
const followSchema = require('./following.schema.server');
const followingModel = mongoose.model('FollowingModel', followSchema);

createFollowing = (userId, following) => {
    var newFollowing = {
        user: userId,
        following: following
    };
    return followingModel.create(newFollowing);
};

updateFollowing = (id, following) =>
    followingModel.update({_id: id}, {$set: following});

findFollowingById = followingId =>
    followingModel.findById(followingId);

findAllFollowing = () =>
    followingModel.find()
        .populate('user', 'username -_id')
        .populate('following', 'username -_id');

findFollowingByUserId = userId =>
    followingModel.find({user: userId})
        .then(users => {
            if (users.length === 0) {
                return null;
            } else {
                return users[0];
            }
        });

deleteFollowing = id =>
    followingModel
        .remove({_id: id});

module.exports = {deleteFollowing, findFollowingByUserId,
    findAllFollowing, findFollowingById, updateFollowing, createFollowing};
