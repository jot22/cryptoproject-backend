Investor = require('../data/models/investor.model.server');
const mongoose = require('mongoose');
const investorSchema = require('../data/models/investor.schema.server');
const investorModel = mongoose.model('InvestorModel', investorSchema);
const investorDao = require('../data/models/investor.dao.server');


// Handle index actions
exports.index = (req, res) =>{
    investorModel.find((err, students) => {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json(students);
    });
};

exports.new = (req, res) => {
    investorDao.createInvestor({
        _id: req.body._id,
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    }).then(newInvestor => res.json(newInvestor))
};

// Handle delete contact
exports.delete = (req, res) => {
    investorModel.remove({
        _id: req.params.id
    }, (err, investor) =>{
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Student deleted'
        });
    });
};

// Handle update contact info
exports.update = (req, res) => {
    investorDao
        .updateInvestor(
            req.params.id,
            {username: req.body.username,
                password: req.body.password,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                gradYear: req.body.gradYear,
                scholarship: req.body.scholarship})
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
}
