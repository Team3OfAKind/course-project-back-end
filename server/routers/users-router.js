'use strict';

module.exports = ({ app, controllers, authentication }) => {
    const controller = controllers.user;

        app.get('/api/users/:username',  controller.getProfile);
        app.post('/api/users/:username/edit', controller.editProfile);
};