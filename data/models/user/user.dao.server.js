const mongoose = require('mongoose');
const userSchema = require('./user.schema.server');
const userModel = mongoose.model('UserModel', userSchema);


createUser = (investor) =>
    userModel.create(investor);

findUserById = userId =>
    userModel.findById(userId);

findUserByUsername = username =>
    userModel.find({username: username})
        .then(users => {
            if (users.length === 0) {
                return null;
            } else {
                return users[0];
            }
        });

findUserByCredentials = (username, password) =>
    userModel.find({username: username, password: password})
        .then(users => {
                if (users.length === 0) {
                    return null;
                } else {
                    return users[0];
                }
            }
        );

findAllUsers = () =>
    userModel.find();

updateUser = (id, user) =>
    userModel
        .update({id: id}, {$set: user});

deleteUser = id =>
    userModel
        .remove({id: id});

module.exports = {
    createUser, findUserById, findAllUsers, updateUser, deleteUser,
    findUserByUsername, findUserByCredentials
};
