let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let app = express();
let cors = require('cors');
let apiRoutes = require("./api-routes/api-routes");
let session = require('express-session');

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());
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
app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});

