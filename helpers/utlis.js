const config = require('../config/config.json');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const Utlis = {
    hashPassword: function (inputPassword, salt) {
        return new Promise((resolve, reject) => {
            bcrypt.hash(inputPassword.toString(), salt, (err, hashedPw) => {
                if (err) {
                    console.log(err);
                    reject(false);
                } else {
                    resolve(hashedPw);
                }
            });
        });
    },
    generateJWT: function (payload) {
        const token = jwt.sign(payload, config.JWT_KEY, {
            expiresIn: "1h"
        });
        return token;
    },
    checkValidationRequestErrors: function (request, response) {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(422).json({ errors: errors.array() });
        }
    }
};

module.exports = Utlis;