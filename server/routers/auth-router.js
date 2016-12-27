'use strict';

module.exports = ({ app, controllers, authentication }) => {
    const controller = controllers.auth;

    app.post('/api/auth/register', controller.register);
    app.post('/api/auth/login', controller.loginLocal);
    app.get('/api/auth/logout', controller.logout);
    // app.get('/api/auth//getLoggedUser', authController.getLoggedUser);

}