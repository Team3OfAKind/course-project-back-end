/* globals require */
'use strict';
const passport = require("passport");
const jwt = require('jwt-simple');
const constants = require('../utilities/constants');

module.exports = {
    isAuthenticated(req, res, next) {
        console.log(req);
        let token = req.headers.authorization || (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];

        if (token) {
            try {
                var decoded = jwt.decode(token, constants.secret);

                User.findOne({ _id: decoded.id }, function (err, user) {
                    req.user = user;
                });

            } catch (err) {
                return next();
            }
        } else {
            next();
        }
    }
}