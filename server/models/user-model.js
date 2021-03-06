/* globals module require */
'use strict';

const mongoose = require('mongoose'),
    encryptor = require('../utilities/encryptor'),
    Schema = mongoose.Schema,
    constants = require('../utilities/constants');

const userSchema = new Schema({
    username: {
        type: String,
        match: constants.USERNAME_REGEX,
        unique: true,
        required: true,
        minlength: constants.MIN_USERNAME_LENGTH,
        maxlength: constants.MAX_USERNAME_LENGTH
    },
    firstName: {
        type: String,
        match: constants.NAME_REGEX,
        required: true,
        minlength: constants.MIN_NAME_LENGTH,
        maxlength: constants.MAX_NAME_LENGTH
    },
    lastName: {
        type: String,
        match: constants.NAME_REGEX,
        required: true,
        minlength: constants.MIN_NAME_LENGTH,
        maxlength: constants.MAX_NAME_LENGTH
    },
    passHash: { type: String, required: true },
    salt: { type: String, required: true },
    email: { type: String, match: constants.EMAIL_REGEX },
    image: { type: String, default: '' },
    cartMeals: [{}],
    addresses: [{
        street: { type: String, required: true },
        city: { type: String, required: true }
    }],
    favouriteMeals: [],
    orders: [{
        meals: [{
            name: { type: String, required: true },
            imageLink: { type: String },
            price: { type: Number, required: true },
            quantity: {type: Number, required: true }
        }],
        address: {
            street: { type: String, required: true },
            city: { type: String, required: true }
        },
        totalPrice: { type: String, required: true},
        orderDate: { type: Date, required: true },
        orderDateString: { type: String, required: true }
    }]
});

mongoose.model('User', userSchema);

module.exports = mongoose.model('User');