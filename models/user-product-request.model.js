const { DataTypes } = require("sequelize");
const { ProductRequestStatus } = require("../enums/product-request-status.emum");

module.exports = (sequelize) => {
    const UserProductRequest = sequelize.define("user-product-request", {
        status: {
            type: DataTypes.ENUM(ProductRequestStatus.CREATED, ProductRequestStatus.DELIVERED, ProductRequestStatus.CANCELED),
            defaultValue: ProductRequestStatus.CREATED
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

    return UserProductRequest;
};