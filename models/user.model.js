const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
    const User = sequelize.define("user", {
        username: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        allowed_limit: {
            type: DataTypes.INTEGER
        },
        createdAt: {
            type: DataTypes.DATE(3),
            // defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3)'),
        },
        updatedAt: {
            type: DataTypes.DATE(3),
            // defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)'),
        }
    });
    return User;
};