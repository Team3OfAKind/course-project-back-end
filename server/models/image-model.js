/* globals module require */
'use strict';

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;


const imageSchema = new Schema({
    source: {
        type: String,
        required: true
    }
});

mongoose.model('Image', imageSchema);

module.exports = mongoose.model('Image');