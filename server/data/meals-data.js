/* globals module require */
'use strict';

module.exports = function(models, validator) {
    const Meal = models.Meal;

    return {
        getAllMeals() {
            return new Promise((resolve, reject) => {
                Meal.find({}, function(err, meals) {
                    if (err) {
                        return reject(err);
                    };

                    return resolve(meals);
                });
            });
        },
        getMealById(id) {
            return new Promise((resolve, reject) => {
                Meal.findOne({ _id: id }, (err, meal) => {
                    if (err) {
                        return reject(err);
                    }

                    if (!meal) {
                        return resolve(null);
                    }

                    return resolve(meal);
                });
            });
        },
        getMostPopularMeals() {
            return new Promise((resolve, reject) => {
                const meals = Meal.find({})
                    .sort({ 'likes': 'desc' })
                    .limit(10);

                resolve(meals);
            });
        }
    };
};