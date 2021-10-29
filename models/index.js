const Sequelize = require("sequelize");
const dbConfig = require('../config/db.config');
const appEnvironment = require("../environment");


module.exports = (() => {
    function applyAssociationSetup(models) {
        console.log(models);
        const { User, Product, ProductCategory, UserProductRequest } = models;

        ProductCategory.hasMany(Product, { as: 'products' });
        Product.belongsTo(ProductCategory);

        User.hasMany(UserProductRequest);
        UserProductRequest.belongsTo(Product);

    }

    const config = process.env || dbConfig(appEnvironment.environment);
    const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD,
        {
            host: config.HOST,
            dialect: config.dialect,
            operatorsAliases: false,
            pool: {
                max: +config.POOL_MAX,
                min: +config.POOL_MIN,
                acquire: +config.POOL_ACQUIRE,
                idle: +config.POOL_IDLE
            }
        });

    const models = {
        User: require("./user.model")(sequelize),
        ProductCategory: require("./product-category.model")(sequelize),
        Product: require("./product.model")(sequelize),
        UserProductRequest: require('./user-product-request.model')(sequelize),
    };

    applyAssociationSetup(models);

    const db = {
        // Sequelize: Sequelize,
        sequelize: sequelize,
        models: models
    };


    return db;
})();