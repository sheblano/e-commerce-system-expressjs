const { models } = require("../models");
const { Op, Sequelize } = require("sequelize");
const { ProductRequestStatus } = require("../enums/product-request-status.emum");

module.exports = {
    /**
     * getting products which are within user allowed limit
     * @param {UserModel} user 
     * @returns Promise of Product[]
     */
    getProductsWithinAllowedLimit: async (user) => {
        return models.Product.findAll({
            include: models.ProductCategory,
            where: {
                price: {
                    [Op.lte]: user.allowed_limit
                }
            }
        });
    },

    /**
     * getting the product by id
     * @param {number} id 
     * @returns Promise of Product
     */
    getProductWithId: async (id) => {
        return models.Product.findOne({
            where: {
                id
            }
        });
    },

    /**
     * for reading user current allowed limit at the moment from the db
     * to secure we are getting updated value instead of reading user object from the session
     * @param {number} userId 
     * @returns Promise of User
     */
    getUserCurrentAllowedLimit: async (userId) => {
        const user = await models.User.findOne({
            where: {
                id: userId
            }
        });
        return user.allowed_limit;
    },

    /**
     * create a product request for a specefic product for specific user
     * @param {Product} product 
     * @param {number} userId 
     * @param {Sequelize transaction} trx 
     * @returns  Promise<UserProductRequest>
     */
    createProductRequest: async (product, userId, trx) => {
        return models.UserProductRequest.create({
            status: ProductRequestStatus.CREATED,
            userId: userId,
            productId: product.id
        }, { transaction: trx, include: models.Product });
    },

    /**
     * update the allowed limit for the user with new value
     * @param {number} cost 
     * @param {number} allowedLimit 
     * @param {number} userId 
     * @param {Sequelize transaction} trx 
     * @returns Promise<User>
     */
    updateUserAllowedLimit: async (newAmount, userId, trx) => {
        return models.User.update({
            allowed_limit: newAmount,
        }, {
            where: {
                id: userId
            },
            transaction: trx
        });
    },

    /**
     * for canceling the product request for that user
     * @param {number} userId 
     * @param {number} requestId 
     * @param {Sequelize transaction} trx 
     * @returns  Promise<UserProductRequest>
     */
    cancelProductRequest: async (userId, requestId, trx) => {
        return models.UserProductRequest.update({
            status: ProductRequestStatus.CANCELED,
        }, {
            where: {
                id: requestId,
                userId
            },
            transaction: trx
        });
    },

    /**
     * for getting the product request with id
     * @param {number} id 
     * @returns Promise<UserProductRequest>
     */
    getProductRequest: async (id) => {
        return models.UserProductRequest.findOne({
            where: {
                id
            }
        });
    }
}