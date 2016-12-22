/* globals require */
'use strict';

module.exports = {
    isAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            next();
        } else {
            res.json({result: {error: 'Unauthorized'}});
        }
    }
}