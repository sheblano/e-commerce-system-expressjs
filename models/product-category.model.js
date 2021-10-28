const { DataTypes } = require("sequelize");
const Product = require("./product.model");

module.exports = (sequelize) => {
    const ProductCategory = sequelize.define("product-category", {
        name: {
            type: DataTypes.STRING
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
        },
    });

    return ProductCategory;
};