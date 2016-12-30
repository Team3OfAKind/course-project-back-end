/* globals require */
'use strict';

module.exports = ({ app, controllers, passport }) => {
    const controller = controllers.meals;

    // app.get('/api/meals', controller.getAll);
    app.get('/api/meals', controller.getOnePage);
    app.put('/api/meals/like', passport.authenticate('jwt', { session: false }), controller.likeMeal);
    app.put('/api/meals/dislike', passport.authenticate('jwt', { session: false }), controller.dislikeMeal);

};