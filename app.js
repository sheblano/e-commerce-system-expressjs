const express = require('express');
const CONSTANTS = require('./config/config.json');
const config = require('./config/init');
const dbConfig = require('./config/db.config');
const db = require("./models");

// routes
const authRoute = require('./routes/auth');

// Application Environment
let environment = 'LOCAL';
let port = process.env.PORT || CONSTANTS[environment].SERVER_PORT;

// initialize express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(express.json());

// middlware for cors origin
app.use(config.cors);

// init DB
db(dbConfig(environment)).schema.sync({ alter: true }).then(() => {
    console.log("DB IS UP and Synced.");
});

// this is a global prefix for all the APIs
const globalApiPrefix = CONSTANTS.API_PREFIX_URL;

// Initialize the routes 
app.use(globalApiPrefix.concat(CONSTANTS.END_POINTS.AUTH.ROUTE_BASE_URL), authRoute);

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});