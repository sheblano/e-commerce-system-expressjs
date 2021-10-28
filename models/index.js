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