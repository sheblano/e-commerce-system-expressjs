const express = require('express');
require('dotenv').config();
const CONSTANTS = require('./config/config.json');
const config = require('./config/init');
const db = require("./models");
const appEnvironment = require("./environment");

// routes
const authRoute = require('./routes/auth.route');
const productRoute = require('./routes/product.route');

// Application Environment
let port = process.env.SERVER_PORT || CONSTANTS[appEnvironment.environment].SERVER_PORT;
// initialize express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(express.json());

// middlware for cors origin
app.use(config.cors);

// init DB
const database = db;
database.sequelize.sync({ alter: true }).then(async (res) => {
    console.log("DB IS UP and Synced.");
});

// this is a global prefix for all the APIs
const globalApiPrefix = CONSTANTS.API_PREFIX_URL;

// Initialize the routes 
app.use(globalApiPrefix.concat(CONSTANTS.END_POINTS.AUTH.ROUTE_BASE_URL), authRoute);
app.use(globalApiPrefix.concat(CONSTANTS.END_POINTS.PRODUCT.ROUTE_BASE_URL), productRoute);

process.on('uncaughtException', function (err) {
    console.log("uncaughtException...");
    console.error(err.stack);
});

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});