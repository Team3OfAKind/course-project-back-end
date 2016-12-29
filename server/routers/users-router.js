'use strict';

module.exports = ({ app, controllers, passport }) => {
    const controller = controllers.user;

        app.get('/api/users/profile', passport.authenticate('jwt', { session: false }), controller.getProfile);
        app.get('/api/users/cart', passport.authenticate('jwt', { session: false }), controller.getCart);
        app.get('/api/users/addresses', passport.authenticate('jwt', { session: false }), controller.getAddresses);
        app.post('/api/users/addresses', passport.authenticate('jwt', { session: false }), controller.addAddress);
        app.post('/api/users/cart/add',  passport.authenticate('jwt', { session: false }), controller.addToCart);
        app.post('/api/users/cart/update',  passport.authenticate('jwt', { session: false }), controller.updateMealCartQuantity);
        app.post('/api/users/cart/remove',  passport.authenticate('jwt', { session: false }), controller.removeFromCart);
};