const express = require('express');
const router = express.Router();
const Utlis = require('../helpers/utlis');
const authController = require('../controllers/auth.controller');
const authValidator = require('../validators/auth.validator');

/**
 * Ping Server API
 * NOT protected
 */
router.get('/', (req, res) => {
    res.json({
        "message": "welcome to simple e-commerce system"
    });
});

/**
 * User loign 
 * @input user.username
 * @input user.password
 * API is NOT protected
 */
router.post('/login', authValidator.userLogin, async (req, res) => {
    try {
        Utlis.checkValidationRequestErrors(req, res);
        const user = await authController.getUser(req.body.username);
        // if this is a valid username so get the user
        if (user) {
            const result = await authController.loginUser(req.body.password, user);
            res.status(result.status).json(result.body);
        } else {
            // if username does not exists in the DB
            console.log('error -1');
            return res.status(401).json({
                errorMsg: 'authentication failure'
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            errorMsg: 'General server failure'
        });
    }

});

/**
 * Add random user to the database for testing purposes
 * API is NOT protected
*/
router.post('/register/test', authValidator.userLogin, async (req, res) => {
    try {
        let addedUser = await authController.createTestUser();
        addedUser = JSON.stringify(addedUser);
        const { password, createdAt, updatedAt, salt, ...remain } = JSON.parse(addedUser);
        res.status(201).json(remain);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            errorMsg: 'General server failure'
        });
    }
});

module.exports = router;
