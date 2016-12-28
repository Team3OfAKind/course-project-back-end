'use strict';

module.exports = ({ app, controllers, passport }) => {
    const controller = controllers.user;

        app.get('/api/users/cart', passport.authenticate('jwt', { session: false }), controller.getCart);
        app.post('/api/users/cart/add',  passport.authenticate('jwt', { session: false }), controller.addToCart);
        app.post('/api/users/cart/update',  passport.authenticate('jwt', { session: false }), controller.updateMealCartQuantity);
        app.post('/api/users/cart/remove',  passport.authenticate('jwt', { session: false }), controller.removeFromCart);
};