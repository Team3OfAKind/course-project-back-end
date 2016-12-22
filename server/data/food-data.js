/* globals module require */
'use strict';

module.exports = function(models, validator) {
    const Food = models.Food;

    return {
        getAllFoods() {
            return new Promise((resolve, reject) => {
                Food.find({}, function(err, foods) {
                    if (err) {
                        return reject(err);
                    };

                    return resolve(foods);
                });
            });
        },
        getFoodById(id) {
            return new Promise((resolve, reject) => {
                Food.findOne({ _id: id }, (err, food) => {
                    if (err) {
                        return reject(err);
                    }

                    if (!food) {
                        return resolve(null);
                    }

                    return resolve(food);
                });
            });
        },
        getMostPopularFoods() {
            return new Promise((resolve, reject) => {
                const foods = Food.find({})
                    .sort({ 'likes': 'desc' })
                    .limit(10);

                resolve(foods);
            });
        }
    };
};