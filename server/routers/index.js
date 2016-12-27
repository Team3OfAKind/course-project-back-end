/* globals require module __dirname */
'use strict';

const fs = require('fs'),
    path = require('path');
    

module.exports = ({ app, data, controllers, passport }) => {
    fs.readdirSync('./server/routers')
        .filter(x => x.includes('-router'))
        .forEach(file => {
            require(path.join(__dirname, file))({ app, data, controllers, passport});
        });

    app.get('*', function (req, res) {
        res.status(404).redirect('/404');
    });

};