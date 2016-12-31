/* globals module require */
'use strict';

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;


const infoSchema = new Schema({
    moto: { type: String, required: true },
    story: { type: String, required: true },
    detailedDescription: { type: String, required: true },
    establishedYear: { type: Number, required: true },
    establishedStory: { type: String, required: true },
    traditions: { type: String, required: true },
    foodQuality: { type: String, required: true },
    statistics: {
        beersSold: { type: Number, required: true },
        mealsDelivered: { type: Number, required: true },
        customersCount: { type: Number, required: true },
        pizzasEaten: { type: Number, required: true },
        bestTime: { type: Number, required: true }
    },
    delivery: {
        description: { type: String, required: true },
        cost: { type: String, required: true },
        time: { type: String, required: true },
        noDeliveryOrder: { type: String, required: true }
    },
    contacts: {
        address: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true }     
    }
});

mongoose.model('RestaurantInfo', infoSchema);

module.exports = mongoose.model('RestaurantInfo');