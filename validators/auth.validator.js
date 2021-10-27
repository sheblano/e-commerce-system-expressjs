const { check } = require('express-validator');

module.exports = {
    userLogin: [
        check('username', 'username is required').exists(),
        check('password', 'password is required').exists(),
        check('password', 'password length should be more than 8 chars').isLength({ min: 8 })
    ]
}