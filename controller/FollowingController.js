const mongoose = require('mongoose');
const followSchema = require('../data/models/following/following.schema.server');
const followingModel = mongoose.model('FollowingModel', followSchema);
const followingDao = require('../data/models/following/following.dao.server');

exports.createFollowing = (req, res) => {
    followingDao.createFollowing(req.body.user, req.body.following).then(following => res.json(following));
};

exports.findAllFollowings = (req, res) => {
    followingDao.findAllFollowing().then(response => {
        res.json(response);
    })
};

exports.findFollowingByUserId = (req, res) => {
    followingDao.findFollowingByUserId(req.body.user).then(response =>
        res.json(response)
    )
};

exports.findFollowingById = (req, res) => {
    followingDao
        .findFollowingById(req.params.id)
        .then(foundFollowing => {
            res.json(foundFollowing)
        })
};

exports.addToFollowing = (req,res) => {
    if (req.body.newFollow != null) {
        followingDao.findFollowingById(req.params.id).then(response => {
            console.log(response);
            if (!response.following.includes(req.body.newFollow)) {
                console.log(req.body.following);
                response.following.push(req.body.newFollow);
                followingDao.updateFollowing(req.params.id, response).then(status => {
                    res.json({
                        status: "success",
                        message: status
                    });
                });
            }
        });
    }
}

exports.removeFromFollowing = (req, res) => {
    if (req.body.newFollow != null) {
        followingDao.findFollowingByUserId(req.body.user).then(response => {
            console.log(response);
            var index = response.following.indexOf(req.body.newFollow);
            if (index > -1) {
                response.following.splice(index, 1);
            }
            followingDao.updateFollowing(req.params.id, response).then(status => {
                res.json({
                    status: "success",
                    message: status
                });
            });
        });
    }
};

exports.deleteFollowing = (req, res) => {
    followingModel.remove({
        _id: req.params.id
    }, (err, following) =>{
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Following deleted'
        });
    });
};
