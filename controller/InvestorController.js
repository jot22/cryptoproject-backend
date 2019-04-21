User = require('../data/models/user/user.model.server');
const mongoose = require('mongoose');
const userSchema = require('../data/models/user/user.schema.server');
const userModel = mongoose.model('InvestorModel', userSchema);
const userDao = require('../data/models/user/user.dao.server');


exports.index = (req, res) => {
    userModel.find((err, investors) => {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json(investors);
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
    }).then(newInvestor => {
        res.json(newInvestor)
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
