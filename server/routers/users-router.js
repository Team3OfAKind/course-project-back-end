'use strict';

module.exports = ({ app, controllers, authentication, uploadUserImage }) => {
    const controller = controllers.user;

        app.get('/api/users/:username', controller.getProfile);
        app.post('/api/users/:username/edit', controller.editProfile);
};