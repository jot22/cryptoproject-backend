const mongoose = require('mongoose');
const investorDao = require('../data/models/investor/investor.dao.server');

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
    investorDao.findInvestorByUsername(username)
        .then(function (user) {
            if (user) {
                res.send(400);
            } else {
                investorDao.createInvestor(newUser)
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
    investorDao.findInvestorByCredentials(username, password)
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