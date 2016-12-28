'use strict';

const router = require('express').Router();
const passport = require('passport');

module.exports = function({ app, controllers }) {
    const home = controllers.home;

    router
        .get('/test', passport.authenticate('jwt', { session: false }), (req, res) => {
            res.send("here" + req.user._id);
        })
        .get('/api/gallery', home.getGallery);

    app.use(router);
};