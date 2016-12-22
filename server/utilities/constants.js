'use strict';

module.exports = {
    competitionStatus: ['passed', 'ongoing', 'upcoming'],
    MIN_USERNAME_LENGTH: 5,
    MAX_USERNAME_LENGTH: 50,
    MIN_NAME_LENGTH: 3,
    MAX_NAME_LENGTH: 50,
    MIN_FOOD_NAME_LENGTH: 3,
    MAX_FOOD_NAME_LENGTH: 50,
    MIN_CATEGORY_LENGTH: 3,
    MAX_CATEGORY_LENGTH: 50,
    MIN_DESCRIPTION_LENGTH: 20,
    MAX_DESCRIPTION_LENGTH: 200,
    EMAIL_REGEX: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    NAME_REGEX: /^[A-Z]([a-z]?)+$/,
    USERNAME_REGEX: /^[a-zA-Z0-9]+/g
};