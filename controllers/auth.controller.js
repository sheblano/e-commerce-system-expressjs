const db = require("../models");
const Utlis = require('../helpers/utlis');
const bcrypt = require('bcrypt');

module.exports = {
    loginUser: async (req, res, user) => {
        bcrypt.compare(req.body.password, user.password, (err, response) => {
            if (err) {
                console.log('error 1');
                return res.status(401).json({
                    errorMsg: 'authentication failure'
                });
            }

            if (response) { // if password is correct
                const token = Utlis.generateJWT({
                    email: user.email,
                    userId: user.id
                })
                return res.status(200).json({
                    token: token
                })
            } else {
                // if password is incorrect
                console.log('error 2');
                return res.status(401).json({
                    errorMsg: 'authentication failure'
                });
            }
        });
    },

    createTestUser: async () => {
        const random = Math.floor(Date.now() / 1000); // timestamp in seconds
        const hashPassword = await Utlis.hashPassword(random);
        const user = {
            username: `test-${random}`,
            password: hashPassword,
            allowed_limit: 100
        };
        return db().models.User.create(user);
    },

    getUser: async (username) => {
        return db().models.User.findOne({
            where: {
                username
            }
        });
    }
}