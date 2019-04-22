User = require('../data/models/user/user.model.server');
const mongoose = require('mongoose');
const userSchema = require('../data/models/user/user.schema.server');
const userModel = mongoose.model('UserModel', userSchema);
const userDao = require('../data/models/user/user.dao.server');


exports.register = (req, res) => {
    var newUser = {
        username: req.body.username,
        password: req.body.password,
        firstName: '',
        lastName: '',
        type: "INVESTOR",
        wallet: 0
    };
    userDao.findUserByUsername(req.body.username)
        .then(user => {
            if (user) {
                res.send(400);
            } else {
                userDao.createUser(newUser)
                    .then((user) => {
                        req.session['currentUser'] = user;
                        res.send(user);
                    }).catch((err) => {
                    res.json({err});
                });
            }
        }).catch((err) => {
        res.json({err});
    });
};


exports.profile = (req, res) => {
    res.send(req.session['currentUser']);
};

exports.index = (req, res) => {
    userModel.find((err, users) => {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json(users);
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
    }).then(newUser => {
        res.json(newUser)
    })
};

exports.deleteAll = (req, res) => {
  userModel.remove().then(res.send(200));
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

exports.login = (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    userDao.findUserByCredentials(username, password)
        .then(user => {
            if (user) {
                req.session['currentUser'] = user;
                res.send(user);
            } else {
                res.send(400);
            }
        }).catch((err) => {
        res.json({err});
    })
};

exports.logout = (res, req) => {
    req.session.destroy();
    res.send(200);
};

// exports.profile = (res, req) => {
//     res.send(req.session['currentUser']);
// };

// exports.register = (res, req) => {
//     var newUser = {
//         username: req.body.username,
//         password: req.body.password,
//         firstName: '',
//         lastName: '',
//         type: "INVESTOR",
//         wallet: 0
//     };
//     userDao.findUserByUsername(req.body.username)
//         .then(user => {
//             if (user) {
//                 res.send(400);
//             } else {
//                 userDao.createUser(newUser)
//                     .then((user) => {
//                         req.session['currentUser'] = user;
//                         res.send(user);
//                     }).catch((err) => {
//                     res.json({err});
//                 });
//             }
//         }).catch((err) => {
//         res.json({err});
//     });
// };
