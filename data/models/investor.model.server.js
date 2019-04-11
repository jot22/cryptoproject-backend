const mongoose = require('mongoose');
const investorSchema = require('./investor.schema.server');
module.exports = mongoose.model('InvestorModel', investorSchema);
