/* globals module require */
'use strict';

const mongoose = require('mongoose'),
    fs = require('fs'),
    path = require('path');

module.exports = function(config) {
    mongoose.Promise = global.Promise;
    mongoose.connect(config.connectionString);

    const Meal = require('../models/meal-model'),
        User = require('../models/user-model'),
        Image = require('../models/image-model'),
        RestaurantInfo = require('../models/info-model'),
        validator = require('../utilities/validator'),
        models = { Meal, User, Image, RestaurantInfo },
        data = {};

    fs.readdirSync('./server/data')
        .filter(x => x.includes('-data'))
        .forEach(file => {
            const dataModule =
                require(path.join(__dirname, file))(models, validator);
            Object.keys(dataModule)
                .forEach(key => {
                    data[key] = dataModule[key];
                });
        });

    return data;
}