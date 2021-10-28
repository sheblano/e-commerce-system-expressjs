const { DataTypes, Sequelize } = require("sequelize");
const ProductCategory = require("./product-category.model");

module.exports = (sequelize) => {
    const Product = sequelize.define("product", {
        name: {
            type: DataTypes.STRING
        },
        brand: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.INTEGER
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            field: 'created_at',
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            onUpdate: DataTypes.NOW,
            field: 'updated_at',
        }
    });

    return Product;
};