const mongoose = require('mongoose');
const brokerSchema = require('./broker.schema.server');
const brokerModel = mongoose.model('BrokerModel', brokerSchema);

createBroker = (broker) =>
    brokerModel.create(broker);

findBrokerById = brokerId =>
    brokerModel.findById(brokerId);

findAllBrokers = () =>
    brokerModel.find();

updateBroker = (id, broker) =>
    brokerModel
        .update({_id: id}, {$set: broker});

deleteBroker = id =>
    brokerModel
        .remove({_id: id});

module.exports = {createBroker, findBrokerById, findAllBrokers, updateBroker, deleteBroker}
