const { models } = require("../models");
const Utlis = require('../helpers/utlis');
const bcrypt = require('bcrypt');

module.exports = {
    /**
     * just for encabsulating login logic to make route looks cleaner
     * @param {string} password 
     * @param {User} user 
     * @returns Promise<{status: string, body:JSON}>
     */
    loginUser: async (password, user) => {
        return new Promise(function (resolve, reject) {
            // compare user typed password with the one in DB
            bcrypt.compare(password, user.password, (err, response) => {
                if (err) {
                    console.log('error 1');
                    reject({ status: 401, body: { errorMsg: 'authentication failure' } });
                }
                if (response) { // if password is correct then valid login happen
                    const token = Utlis.generateJWT({
                        email: user.email,
                        userId: user.id
                    });
                    resolve({ status: 200, body: { token: token } });
                } else {
                    // if password is incorrect
                    console.log('error 2');
                    reject({ status: 401, body: { errorMsg: 'authentication failure' } });
                }
            });
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