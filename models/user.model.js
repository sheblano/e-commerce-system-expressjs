const { DataTypes } = require("sequelize");

module.exports = (schema, Sequelize) => {
    const User = schema.define("user", {
        username: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        allowed_limit: {
            type: DataTypes.INTEGER
        },
        published: {
            type: DataTypes.BOOLEAN
        },
        createdAt: {
            type: Sequelize.DATE(3),
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3)'),
        },
        updatedAt: {
            type: Sequelize.DATE(3),
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)'),
        },
    });
    return User;
};