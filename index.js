let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let app = express();
const cors = require('cors');

let apiRoutes = require("./api-routes/api-routes");
let session = require('express-session');
const userSchema = require('./data/models/user/user.schema.server');
const userModel = mongoose.model('UserModel', userSchema);
let userController = require('./controller/UserController');
const userDao = require('./data/models/user/user.dao.server');


// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors({
    origin: 'http://localhost:3000',
    exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'],
    credentials: true
}));

app.use(bodyParser.json());
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'sea cret'
}));
// Connect to Mongoose and set connection variable
const databaseName = 'crypto';
var connectionString =
    'mongodb://localhost/';
connectionString += databaseName;
mongoose.connect(connectionString);
var db = mongoose.connection;
// Setup server port
var port = process.env.PORT || 8080;
// Send message for default URL
app.get('/', (req, res) => res.send('Hello World'));
// Use Api routes in the App
app.use('/api', apiRoutes)
// Launch app to listen to specified port
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

app.post('/api/register', function (req, res) {
    var newUser = {
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        type: req.body.role
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
});

app.post('/api/login', function (req, res) {
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
});

app.post('/api/logout', function (req, res) {
    req.session.destroy();
    res.send(200);
});

app.put('/api/user/:id', function(req, res) {
    let newUser = {
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        type: req.body.type,
        phone: req.body.phone,
        email: req.body.email,
        clients: req.body.clients,
        broker: req.body.broker,
        following: req.body.following
    };
    if(newUser.broker != null) {
        userDao.findUserById(req.body.broker).then(response => {
            console.log(response);
                if (!response.clients.includes(req.params.id)) {
                    console.log(req.body.clients);
                    response.clients.push(req.params.id);
                    userDao.updateUser(req.body.broker, response) .then(status => {
                        userDao
                            .updateUser(req.params.id, newUser)
                            .then(status => {
                                req.session['currentUser'] = newUser;
                                res.json({
                                    status: "success",
                                    message: status
                                });
                            });
                    })
                }
            }
        );
    }
    userDao
        .updateUser(req.params.id, newUser)
        .then(status => {
            req.session['currentUser'] = newUser;
            res.json({
                status: "success",
                message: status
            });
        });
});

app.get('/api/profile', function (req, res) {
    if (req.session.currentUser) {
         return res.send(req.session['currentUser']);
    }
    res.sendStatus(400);
    }
);

app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});

