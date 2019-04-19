Investor = require('../data/models/investor/investor.model.server');
const mongoose = require('mongoose');
const investorSchema = require('../data/models/investor/investor.schema.server');
const investorModel = mongoose.model('InvestorModel', investorSchema);
const investorDao = require('../data/models/investor/investor.dao.server');


exports.index = (req, res) =>{
    investorModel.find((err, investors) => {
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
    investorDao.createInvestor({
        _id: req.body._id,
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    }).then(newInvestor => {
        res.json(newInvestor)
    })
};

exports.delete = (req, res) => {
    investorModel.remove({
        _id: req.params.id
    }, (err, investor) =>{
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Investor deleted'
        });
    });
};

exports.update = (req, res) => {
    investorDao
        .updateInvestor(
            req.params.id,
            {username: req.body.username,
                password: req.body.password,
                firstName: req.body.firstName,
                lastName: req.body.lastName})
        .then(status => {
            res.json({
                status: "success",
                message: status
            });
        });
};

exports.findById = (req, res) => {
    investorDao
        .findInvestorById(req.params.id)
        .then(foundInvestor => {
            res.json(foundInvestor)
        })
};
