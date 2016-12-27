/* globals require */
'use strict';

module.exports = ({ app, controllers, passport }) => {
    const controller = controllers.meals;

    app.get('/api/meals', /* passport.authenticate('jwt', { session: false }), */ controller.getAll);
};