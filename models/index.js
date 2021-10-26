const Sequelize = require("sequelize");

module.exports = (dbConfig) => {
    const schema = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD,
        {
            host: dbConfig.HOST,
            dialect: dbConfig.dialect,
            operatorsAliases: false,
            pool: {
                max: dbConfig.pool.max,
                min: dbConfig.pool.min,
                acquire: dbConfig.pool.acquire,
                idle: dbConfig.pool.idle
            }
        });

    const db = {
        Sequelize: Sequelize,
        schema: schema
    };

    db.user = require("./user.model.js")(schema, Sequelize);
    return db;
}