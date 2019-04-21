const mongoose = require('mongoose');
const investorSchema = require('./investor.schema.server');
const investorModel = mongoose.model('InvestorModel', investorSchema);


createInvestor = (investor) =>
    investorModel.create(investor);

findInvestorById = investorId =>
    investorModel.findById(investorId);

findInvestorByUsername = username =>
    investorModel.find({username: username})
        .then(users => {
            if (users.length === 0) {
                return null;
            } else {
                return users[0];
            }
        });

findInvestorByCredentials = (username, password) =>
    investorModel.find({username: username, password: password})
        .then(users => {
                if (users.length === 0) {
                    return null;
                } else {
                    return users[0];
                }
            }
        );

findAllInvestors = () =>
    investorModel.find();

updateInvestor = (id, investor) =>
    investorModel
        .update({_id: id}, {$set: investor});

deleteInvestor = id =>
    investorModel
        .remove({_id: id});

module.exports = {
    createInvestor, findInvestorById, findAllInvestors, updateInvestor, deleteInvestor,
    findInvestorByUsername, findInvestorByCredentials
};
