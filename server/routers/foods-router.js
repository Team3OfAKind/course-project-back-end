/* globals require */
'use strict';

module.exports = ({ app, controllers, authentication, uploadCompetitionImage }) => {
    const controller = controllers.foods;

        app.get('/api/foods/', controller.getAll);
};