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
        },

        getMealsByPageSize({ page, pageSize }) {
            const skip = (page - 1) * pageSize,
                limit = pageSize;
            return new Promise((resolve, reject) => {
                Meal.find({}, {},{
                    skip,
                    limit
                }, (err, meals) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(meals);
                })
            })
        },
        getMealsCount() {
            return new Promise((resolve, reject) => {
                Meal.count({}, (err, count) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(count);
                })
            })
        },
        addUserToMeal(mealId, changedInfo, username) {
            return new Promise((resolve, reject) => {
                const conditions = {
                    _id: mealId,
                    'usersLiked': { $ne: username }
                }
                Meal.findOneAndUpdate(conditions, changedInfo,
                    (err, meal) => {

                        if (err) {
                            return reject(err);
                        }
                        return resolve(meal);
                    })
            });
        },
        removeUserFromMeal(mealId, username) {
            return new Promise((resolve, reject) => {
                Meal.update({ _id: mealId }, { $pull: { 'usersLiked': username } },
                    (err, meal) => {
                        if (err) {
                            return reject(err);
                        }

                        resolve(meal);
                    });
            });
        }
    };
};