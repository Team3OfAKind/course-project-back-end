'use strict';
const jwt = require('jsonwebtoken');

module.exports = ({ data, passport }) => {
    return {
        register(req, res) {
            console.log(req);
            const user = {
                username: req.body.username,
                passHash: req.body.password,
                salt: req.body.salt,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                image: 'http://www.bathspa.ac.uk/media/WebProfilePictures/default_profile.jpg',
                email: req.body.email,
            };

            data.createUser(user)
                .then(() => {
                    res.json({ success: 'Registration successfull' });
                })
                .catch(() => {
                    // TODO: redirect to another page
                    res.json({ error: 'Registration failed' });
                });
        },
        loginLocal(req, res, next) {
            const auth = passport.authenticate('jwt', (err, user) => {
                if (err) {
                    return res.json({ error: 'Invalid username or password' });
                    // next(err);
                    // return;
                }

                if (!user) {
                    return res.json({ error: 'Invalid username or password' });
                }

                let token = jwt.sign(user, 'james bond 007', {
                    expiresIn: 3600
                });
                req.login(user, err => {
                    if (err) {
                        next(err);
                        return;
                    }
                    res.status(201).json({
                        success: true,
                        message: 'Login succesfully!',
                        token: 'JWT ' + token
                    });
                });
            });

            auth(req, res, next);
        },
        logout(req, res) {
            req.logout();
            res.status(202).json({
                succes: true,
                message: `User ${req.body.username} is logged out succesfully`
            });
        },
        getLoggedUser(req, res) {
            const token = req.headers.authorization;
            if (token) {
                let decoded = jwt.decode(token.split(' ')[1], 'james bond 007');

                const userInfo = decoded._doc;
                let user = {
                    username: userInfo.username
                };

                res.status(200).json(user);
            } else {
                res.status(401).json({
                    success: false,
                    message: 'Please provide token'
                });
            }
        }
    }
}