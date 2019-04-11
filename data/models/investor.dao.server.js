const mongoose = require('mongoose');
const investorSchema = require('./investor.schema.server');
const investorModel = mongoose.model('InvestorModel', investorSchema);



createInvestor = (investor) =>
    investorModel.create(investor);

findInvestorById = investorId =>
    investorModel.findById(investorId);

findAllInvestors = () =>
    investorModel.find();

updateInvestor = (id, investor) =>
    investorModel
        .update({_id: id}, {$set: investor});

deleteInvestor = id =>
    investorModel
        .remove({_id: id});

module.exports = {createInvestor, findInvestorById, findAllInvestors, updateInvestor, deleteInvestor}
