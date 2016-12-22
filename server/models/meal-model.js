/* globals module require */
'use strict';

const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    constants = require('../utilities/constants')

let MealSchema = new Schema({

    imageLink: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: String,
        required: true
    }
});

MealSchema.methods.getActive = function() {
    if (+Date.now() > +new Date(this.endDate)) {
        return 'arrived';
    } else {
        return 'active';
    }
};

mongoose.model('Meal', MealSchema);

module.exports = mongoose.model('Meal');