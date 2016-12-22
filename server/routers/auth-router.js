'use strict';

module.exports = ({ app, controllers, authentication, uploadUserImage }) => {
    const controller = controllers.auth;

        app.post('/api/auth/register', controller.register);
        app.post('/api/auth/login', controller.loginLocal);
        app.get('/api/auth/logout', authentication.isAuthenticated, controller.logout);

}