const CONSTANTS = require('../config/config.json');

module.exports = (environment) => {
    return {
        DB_HOST: CONSTANTS[environment].DB_HOST,
        USER: CONSTANTS[environment].DB_USER,
        PASSWORD: CONSTANTS[environment].DB_PASSWORD,
        DB: CONSTANTS[environment].DB_SCHEMA,
        DIALECT: CONSTANTS[environment].DIALECT,
        POOL_MAX: 5,
        POOL_MIN: 0,
        POOL_ACQUIRE: 30000,
        POOL_IDLE: 10000
    }
};