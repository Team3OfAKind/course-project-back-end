/* globals require */
'use strict';
const passport = require('passport');

module.exports = ({ app, controllers, authentication }) => {
    const controller = controllers.meals;

        app.get('/api/meals', /*authentication.isAuthenticated,*/ controller.getAll);
};