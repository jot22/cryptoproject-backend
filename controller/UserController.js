User = require('../data/models/user/user.model.server');
const mongoose = require('mongoose');
const userSchema = require('../data/models/user/user.schema.server');
const userModel = mongoose.model('UserModel', userSchema);
const userDao = require('../data/models/user/user.dao.server');
const followingDao = require("../data/models/following/following.dao.server");
exports.index = (req, res) => {
    userModel.find((err, users) => {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json(users);
    });
};

exports.new = (req, res) => {
    userDao.createUser({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        type: req.body.type,
        phone: req.body.phone,
        email: req.body.email,
        wallet: req.body.wallet,
        clients: req.body.clients
    }).then(newUser => {
        console.log(newUser);
        followingDao.createFollowing(newUser._id, []).then(newUser => {
            res.json(newUser)
        })
            .catch(err => res.json(err));
    })
};

exports.deleteAll = (req, res) => {
    userModel.remove().then(res.send(200));
};

exports.delete = (req, res) => {
    userModel.remove({
        _id: req.params.id
    }, (err, user) => {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'User deleted'
        });
    });
};

exports.update = (req, res) => {
    userDao
        .updateUser(
            req.params.id,
            {
                username: req.body.username,
                password: req.body.password,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                type: req.body.type,
                phone: req.body.phone,
                email: req.body.email,
                clients: req.body.clients,
                broker: req.body.broker
            })
        .then(status => {
            res.json({
                status: "success",
                message: status
            });
        });
};

exports.findById = (req, res) => {
    userDao
        .findUserById(req.params.id)
        .then(foundUser => {
            res.json(foundUser)
        })
};

exports.findAll = (req, res) => {
    userDao.findAllUsers()
        .then(users => res.send(users))
};

exports.findByUsername = (req, res) => {
    userDao.findUserByUsername(req.params.name)
        .then(user => {
            if (user) {
                res.send(400);
            } else {
                res.send(200);
            }
        });
};
