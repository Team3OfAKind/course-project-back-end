/* globals module require */
'use strict';

const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    constants = require('../utilities/constants')

const foodSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: constants.MIN_FOOD_NAME_LENGTH,
        maxlength: constants.MAX_FOOD_NAME_LENGTH
    },
    likes: { type: Number, required: true },
    category: {
        type: String,
        required: true,
        minlength: constants.MIN_CATEGORY_LENGTH,
        maxlength: constants.MAX_CATEGORY_LENGTH
    },
    description: {
        type: String,
        minlength: constants.MIN_DESCRIPTION_LENGTH,
        maxlength: constants.MAX_DESCRIPTION_LENGTH
    },
    usersLiked: [String],
});

foodSchema.methods.getActive = function() {
    if (+Date.now() > +new Date(this.endDate)) {
        return 'arrived';
    } else {
        return 'active';
    }
};

mongoose.model('Food', foodSchema);

module.exports = mongoose.model('Food');