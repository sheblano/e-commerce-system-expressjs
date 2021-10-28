const { models } = require("../models");
const Utlis = require('../helpers/utlis');
const bcrypt = require('bcrypt');

module.exports = {
    /**
     * just for encabsulating login logic to make route looks cleaner
     * @param {request} req 
     * @param {response} res 
     * @param {User} user 
     * @returns JSON response and status
     */
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
    /**
     * for creating random and test users for making a working flow
     * @returns Promise<User>
     */
    createTestUser: async () => {
        const random = Math.floor(Date.now() / 1000); // timestamp in seconds
        const salt = await bcrypt.genSalt();
        const hashPassword = await Utlis.hashPassword(random, salt);
        const user = {
            username: `test-${random}`,
            password: hashPassword,
            allowed_limit: 100,
            salt: salt
        };
        return models.User.create(user);
    },

    /**
     * for getting the user by username
     * @param {string} username 
     * @returns Promise<User>
     */
    getUser: async (username) => {
        return models.User.findOne({
            where: {
                username
            }
        });
    },

    /**
     * for getting user by id
     * @param {number} id 
     * @returns  Promise<User>
     */
    getUserById: async (id) => {
        return models.User.findOne({
            where: {
                id
            }
        });
    },
}