const express = require('express');
const router = express.Router();
const Utlis = require('../helpers/utlis');
const checkAuth = require('../middeware/auth');
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
 */
router.post('/login', authValidator.userLogin, async (req, res) => {
    try {
        Utlis.checkValidationRequestErrors(req, res);
        const user = await authController.getUser(req.body.username);

        if (user) {
            return authController.loginUser(req, res, user);
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
            errorMsg: err
        });
    }

});

/**
* Add random users to the database for testing the app
* API is NOT protected
*/
router.post('/register-test', authValidator.userLogin, async (req, res) => {
    try {
        let addedUser = await authController.createTestUser();
        console.log('********************');
        addedUser = JSON.stringify(addedUser);
        const { password, ...remain } = JSON.parse(addedUser);
        res.status(201).json(remain);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            errorMsg: err
        });
    }
});

module.exports = router;
