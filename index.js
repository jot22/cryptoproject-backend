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
});

app.get('/api/profile', function (req, res) {
        res.send(req.session['currentUser']);
    }
);

app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});

