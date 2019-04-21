const mongoose = require('mongoose');
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
