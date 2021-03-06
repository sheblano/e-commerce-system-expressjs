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
        salt: {
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
        }
    });
    return User;
};