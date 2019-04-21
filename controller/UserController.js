User = require('../data/models/user/user.model.server');
const mongoose = require('mongoose');
const userSchema = require('../data/models/user/user.schema.server');
const userModel = mongoose.model('UserModel', userSchema);
const userDao = require('../data/models/user/user.dao.server');


exports.register = (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    var newUser = {
        username: username,
        password: password,
        firstName: '',
        lastName: '',
        wallet: 0
    };
    userDao.findUserByUsername(username)
        .then(function (user) {
            if (user) {
                res.send(400);
            } else {
                userDao.createUser(newUser)
                    .then(function (user) {
                        req.session['currentUser'] = user;
                        res.send(user);
                    });
            }
        });
};

exports.login = (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    userDao.findUserByCredentials(username, password)
        .then(function (user) {
            if (user) {
                req.session['currentUser'] = user;
                res.send(user);
            } else {
                res.send(400);
            }
        });
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.send(200);
};

exports.profile = (req, res) => {
    res.send(req.session['currentUser']);
};

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
        _id: req.body._id,
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        type: req.body.type,
        wallet: req.body.wallet
    }).then(newUser => {
        res.json(newUser)
    })
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
                wallet: req.body.wallet
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
