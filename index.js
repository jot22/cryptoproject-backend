// Import express
let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');
// Initialize the app
let app = express();
// Import routes
let apiRoutes = require("./api-routes/api-routes")
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// Connect to Mongoose and set connection variable
const databaseName = 'crypto';
// THIS DB IS HOSTED ON THE CLOUD, THEREFORE DONT MESS WITH THE STRINGgit 
var connectionString =
    'mongodb+srv://jalannin:banjokazooie%2127@cluster0-txyld.mongodb.net/test?retryWrites=true';
connectionString += databaseName;
mongoose.connect(connectionString);
var db = mongoose.connection;
// Setup server port
var port = process.env.PORT || 8080;
// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));
// Use Api routes in the App
app.use('/api', apiRoutes)
// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});
