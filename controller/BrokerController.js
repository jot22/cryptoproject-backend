const mongoose = require('mongoose');
const brokerModel = require('../data/models/broker/broker.model.server');
const brokerDao = require('../data/models/broker/broker.dao.server');


exports.index = (req, res) =>{
    brokerModel.find((err, broker) => {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json(broker);
    });
};

exports.new = (req, res) => {
    brokerDao.createBroker({
        _id: req.body._id,
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    }).then(newBroker => res.json(newBroker))
};

exports.delete = (req, res) => {
    brokerModel.remove({
        _id: req.params.id
    }, (err, broker) =>{
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Broker deleted'
        });
    });
};

exports.update = (req, res) => {
    brokerDao
        .updateBroker(
            req.params.id, {
                username: req.body.username,
                password: req.body.password,
                firstName: req.body.firstName,
                lastName: req.body.lastName
            })
        .then(status => {
            res.json({
                status: "success",
                message: status
            });
        });
};

exports.findById = (req, res) => {
    brokerDao
        .findBrokerById(req.params.id)
        .then(foundBroker => {
            res.json(foundBroker)
        })
};
