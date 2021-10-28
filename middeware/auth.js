const jwt = require('jsonwebtoken');
const config = require('../config/config.json');
const authController = require("../controllers/auth.controller");

module.exports = async (req, res, next) => {
    try {
        let receivedToken = req.headers.authorization;
        // console.log(receivedToken);

        let token = req.headers.authorization; //Bearer included
        if (token) {
            token = token.split(" ")[1]; // remove Bearer
        }

        const verifiedAndDecodedToken = jwt.verify(token, config.JWT_KEY);
        console.log('verifiedAndDecodedToken ', verifiedAndDecodedToken);
        req.userData = verifiedAndDecodedToken;
        
        // get user from the database
        const userId = verifiedAndDecodedToken.userId;
        const user = await authController.getUserById(userId);
        if (user) {
            console.log('attach user to the request');
            req.userData.user = user;
            next();
        } else {
            console.log('verified token but user not found in the DB');
            return res.status(401).json({
                errorMsg: 'Invalid Token'
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(401).json({
            errorMsg: 'Invalid Token'
        });
    }
};