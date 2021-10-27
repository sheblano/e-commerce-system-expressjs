const Sequelize = require("sequelize");
const dbConfig = require('../config/db.config');
const appEnvironment = require("../environment");

module.exports = () => {
    const config = dbConfig(appEnvironment.environment);
    const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD,
        {
            host: config.HOST,
            dialect: config.dialect,
            operatorsAliases: false,
            pool: {
                max: config.pool.max,
                min: config.pool.min,
                acquire: config.pool.acquire,
                idle: config.pool.idle
            }
        });

    const models = {
        User: require("./user.model.js")(sequelize)
    };
    const db = {
        // Sequelize: Sequelize,
        sequelize: sequelize,
        models: models
    };


    return db;
}