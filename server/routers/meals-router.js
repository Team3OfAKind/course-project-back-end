/* globals require */
'use strict';

module.exports = ({ app, controllers, passport }) => {
    const controller = controllers.meals;
    const mealsRoute = '/api/meals';
    app.get(mealsRoute, controller.getAll);
    //app.get(mealsRoute, controller.getOnePage);
    app.put(mealsRoute + '/like', passport.authenticate('jwt', { session: false }), controller.likeMeal);
    app.put(mealsRoute + '/dislike', passport.authenticate('jwt', { session: false }), controller.dislikeMeal);
};