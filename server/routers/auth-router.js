'use strict';

module.exports = ({ app, controllers, authentication }) => {
    const controller = controllers.auth;
    const authRoute = '/api/auth';
    app.post(authRoute + '/register', controller.register);
    app.post(authRoute + '/login', controller.loginLocal);
    app.get(authRoute + '/logout', controller.logout);
    // app.get(authRoute + '//getLoggedUser', authController.getLoggedUser);

}