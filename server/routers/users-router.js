'use strict';

module.exports = ({ app, controllers, authentication }) => {
    const controller = controllers.user;

        app.get('/api/users/:username',  controller.getProfile);
        app.post('/api/users/:username/edit', controller.editProfile);
        app.get('/api/users/:username/cart', controller.getCart);
        app.post('/api/users/:username/cart/add', controller.addToCart);
        app.post('/api/users/:username/cart/remove', controller.removeFromCart);
};