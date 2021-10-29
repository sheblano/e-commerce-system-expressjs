const express = require("express");
const router = express.Router();
const checkAuth = require('../middeware/auth');
const productController = require('../controllers/product.controller');
const { sequelize } = require("../models");
const { ProductRequestStatus } = require("../enums/product-request-status.emum");

/**
 * get products for the user
 * protected API
 */
router.get('/', checkAuth, async (req, res) => {
    try {
        const products = await productController.getProductsWithinAllowedLimit(req.userData.user);
        res.status(200).json(products);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            errorMsg: 'General server failure'
        });
    }

});

/**
 * Make a product request for the logged in user
 * protected API
 */
router.post('/:productId/request', checkAuth, async (req, res) => {
    // start a transaction process    
    const transaction = await sequelize.transaction();
    const product = await productController.getProductWithId(req.params.productId);
    const allowedLimit = req.userData.user.allowed_limit;

    try {
        if (product && allowedLimit && product.price <= allowedLimit) {
            const productRequest = await productController.createProductRequest(product, req.userData.user.id, transaction);
            if (productRequest) {
                const newAmount = allowedLimit - product.price;
                const updateLimit = await productController.updateUserAllowedLimit(newAmount, req.userData.user.id, transaction);

                if (updateLimit) {
                    await transaction.commit();
                    res.status(201).json(productRequest);
                } else {
                    await transaction.rollback();
                    console.log("error update user Limit");
                    res.status(500).json({
                        errorMsg: "error update user Limit"
                    });
                }

            } else {
                await transaction.rollback();
                console.log("error product Request is null");
                res.status(500).json({
                    errorMsg: 'General server failure'
                });
            }
        } else {
            await transaction.rollback();
            console.log("user not allowed to process this request");
            res.status(405).json({
                errorMsg: "user not allowed to process this request"
            });
        }
    } catch (err) {
        console.log(err);
        await transaction.rollback();
        res.status(500).json({
            errorMsg: 'General server failure'
        });
    }
});

/**
 * Cancel a product request if its status is not delivered or Canceled
 * protected API
 */
router.patch('/:productId/request/:requestId/cancel', checkAuth, async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        // start a transaction process    
        const productRequest = await productController.getProductRequest(req.params.requestId);
        const product = await productRequest.getProduct();
        const allowedLimit = req.userData.user.allowed_limit;

        if (productRequest.status === ProductRequestStatus.CREATED) {
            const canceledRequest = await productController.cancelProductRequest(req.userData.user.id, req.params.requestId, transaction);

            if (canceledRequest) {
                // refund the request price to user allowed amount
                console.log(allowedLimit, product);
                console.log(allowedLimit, product.price);
                const newAmount = allowedLimit + product.price;
                console.log(newAmount);
                
                const updateUser = await productController.updateUserAllowedLimit(newAmount, req.userData.user.id, transaction);
                console.log(updateUser);

                await transaction.commit();
                res.status(200).json({
                    message: "request has been canceled"
                });
            } else {
                await transaction.rollback();
                res.status(500).json({
                    errorMsg: "this request can not be canceled"
                });
            }
        } else {
            await transaction.rollback();
            res.status(400).json({
                errorMsg: "request should not be delivered or canceled before"
            });
        }
    } catch (err) {
        console.log(err);
        await transaction.rollback();
        res.status(500).json({
            errorMsg: 'General server failure'
        });
    }
});


module.exports = router;