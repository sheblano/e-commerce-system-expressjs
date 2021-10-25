const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Utlis = require('../helpers/utlis');
const checkAuth = require('../middeware/auth');
const User = require('../models/user.model');

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
router.post('/login', (req, res) => {
    User.find({
        username: req.body.username
    }).exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    success: 0,
                    errorMsg: 'authentication failure'
                });
                console.log('1');
            }
            bcrypt.compare(req.body.password, user[0].password, (err, response) => {
                if (err) {
                    return res.status(401).json({
                        success: 0,
                        errorMsg: 'authentication failure'
                    });
                    console.log('2');
                }
                // response = true;
                if (response) { // if password is correct
                    const token = Utlis.generateJWT({
                        email: user[0].email,
                        userId: user[0]._id
                    })
                    return res.status(200).json({
                        success: 1,
                        token: token
                    })
                } else { // if password is incorrect
                    return res.status(401).json({
                        success: 0,
                        errorMsg: 'authentication failure'
                    });
                    console.log('3');
                }
            });

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                success: 0,
                errorMsg: err
            })
        });
});

module.exports = router;
