/* globals require */
'use strict';

module.exports = ({ app, controllers, authentication, uploadCompetitionImage }) => {
    const controller = controllers.meals;

        app.get('/api/meals', controller.getAll);
};