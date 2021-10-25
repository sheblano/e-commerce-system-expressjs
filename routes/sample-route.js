
const { uuid } = require('uuidv4');

module.exports = function (app) {

    var data = {
        users: []
    };
    app.post('/api/user', (req, res) => {
        if (req.body) {
            var login = req.body.login;
            var password = req.body.password;
            var user_id = req.body.user_id;

            data.users.push({
                password,
                login,
                user_id,
                articles: [],
                token: ''
            });
            res.status(201).send();
        } else {
            res.status(400).send();
        }
    });

    app.post('/api/authenticate', (req, res) => {
        if (data.users.length > 0) {
            var foundUserLogin = null;
            var userPwIsCorrect = null;

            foundUser = data.users.find(elment => elment.login == req.body.login);
            if (foundUser) {
                if (foundUser.password == req.body.password) {
                    var returnedResult = {
                        token: uuid()
                    };
                    // rewrite the token to the user
                    for (let index = 0; index < data.users.length; index++) {
                        const currentUser = data.users[index];
                        if (currentUser.user_id == foundUser.user_id) {
                            data.users[index].token = returnedResult.token;
                        }
                    }

                    res.status(200).json(returnedResult);
                } else {
                    res.status(401).send();
                }
            } else {
                res.status(404).send();
            }
        } else {
            res.status(400).send();
        }
    });

    app.post('/api/logout', (req, res) => {
        var token = req.header("authentication-header");
        if (token) {
            for (let index = 0; index < data.users.length; index++) {
                const currentUser = data.users[index];
                if (currentUser.token == token) {
                    currentUser.token = null;
                }
            }
            res.status(200).send();
        } else {
            res.status(401).send();
        }
    });

    app.post('/api/articles', (req, res) => {
        if (req.body) {
            const token = req.header("authentication-header");
            if (token) {
                let tokenFound = false;
                // check token is valid
                for (let i = 0; i < data.users.length; i++) {
                    const currentUser = data.users[i];
                    if (currentUser.token == token) {
                        currentUser.articles.push({
                            article_id: req.body.article_id,
                            title: req.body.title,
                            content: req.body.content,
                            visibility: req.body.visibility
                        });
                        tokenFound = true;
                    }
                }
                if (tokenFound) {
                    res.status(200).send();
                } else {
                    res.status(401).send();
                }
            } else {
                res.status(401).send();
            }
        } else {
            res.status(400).send();
        }

    });

    app.get('/api/articles', (req, res) => {
        const token = req.header("authentication-header");
        let tokenFound = false;
        // check token is valid
        for (let i = 0; i < data.users.length; i++) {
            const currentUser = data.users[i];
            if (currentUser.token == token) {
                tokenFound = true;
            }
        }

        if (token && tokenFound) {

        } else {
            var allArticles = [];
            allArticles.concat(data.users.map(user => {
                return { articles: user.articles, user_id: user.user_id }
            }));
            var result = allArticles.filter(elm => elm.visibility == 'public');
            result = result.map()
            res.status(200).json(result);
        }

    });
}