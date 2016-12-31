'use strict';

module.exports = function ({ app, controllers, passport }) {
    const home = controllers.home;
    const route = '/api';

    app.get(route + '/gallery', home.getGallery);
    app.get(route + '/info', home.getRestaurantInfo);
    app.get(route + '/contacts', home.getRestaurantContacts);
};