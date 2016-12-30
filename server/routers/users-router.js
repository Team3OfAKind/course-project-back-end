'use strict';

module.exports = ({ app, controllers, passport }) => {
    const controller = controllers.user;
        const usersRoute = '/api/users';

        app.get(usersRoute + '/profile', passport.authenticate('jwt', { session: false }), controller.getProfile);
        app.put(usersRoute + '/profile/edit', passport.authenticate('jwt', { session: false }), controller.editProfile);                
        app.get(usersRoute + '/cart', passport.authenticate('jwt', { session: false }), controller.getCart);
        app.get(usersRoute + '/addresses', passport.authenticate('jwt', { session: false }), controller.getAddresses);
        app.post(usersRoute + '/addresses/add', passport.authenticate('jwt', { session: false }), controller.addAddress);
        app.post(usersRoute + '/addresses/remove', passport.authenticate('jwt', { session: false }), controller.removeAddress);
        app.post(usersRoute + '/cart/add',  passport.authenticate('jwt', { session: false }), controller.addToCart);
        app.post(usersRoute + '/cart/update',  passport.authenticate('jwt', { session: false }), controller.updateMealCartQuantity);
        app.post(usersRoute + '/cart/remove',  passport.authenticate('jwt', { session: false }), controller.removeFromCart);
        app.get(usersRoute + '/orders', passport.authenticate('jwt', { session: false }), controller.getOrders);
        app.post(usersRoute + '/orders', passport.authenticate('jwt', { session: false }), controller.addOrder);
};