'use strict';
const jwt = require('jwt-simple');
const constants = require('../utilities/constants');
const encryptor = require('../utilities/encryptor');

module.exports = ({ data, passport }) => {
    return {
        register(req, res) {
            const body = req.body;
            const user = {
                username: req.body.username,
                passHash: req.body.password,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                image: 'http://www.bathspa.ac.uk/media/WebProfilePictures/default_profile.jpg',
                email: req.body.email,
                cartProducts: []
            };

            data.createUser(user)
                .then(() => {
                    res.json({ success: 'Registration successfull' });
                })
                .catch(() => {
                    res.json({ error: 'Registration failed' });
                });
        },
        loginLocal(req, res) {
            const username = req.body.username;
            const password = req.body.password;


            data.getUserByUsername(username)
                .then(user => {
                    if (!user) {
                        res.status(401).json({ message: "no such user found" });
                    }

                    const passHash = encryptor.getPassHash(user.salt, password);

                    if (user.passHash === passHash) {
                        console.log('final stage');
                        var payload = { id: user._id };
                        var token = jwt.encode(payload, constants.secret);
                        console.log(token);
                        res.json({ success: true,user: {username: user.username, token:'JWT ' + token }});
                    } else {
                        res.status(401).json({ message: "passwords did not match" });
                    }
                })
                .catch(err=>{
                    console.log(err);
                    res.status(400).json({error: 'Login unsuccessful!'});
                })
            
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