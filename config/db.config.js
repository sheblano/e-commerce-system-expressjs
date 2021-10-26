const CONSTANTS = require('../config/config.json');

module.exports = (environment) => {
    return {
        HOST: CONSTANTS[environment].DB_HOST,
        USER: CONSTANTS[environment].DB_USER,
        PASSWORD: CONSTANTS[environment].DB_PASSWORD,
        DB: CONSTANTS[environment].DB_SCHEMA,
        dialect: CONSTANTS[environment].dialect,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
};