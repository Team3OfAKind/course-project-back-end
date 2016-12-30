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
        addUserToMeal(mealId, username) {
            return new Promise((resolve, reject) => {
                const conditions = {
                    _id: mealId,
                    'usersLiked': { $ne: username }
                }
                Meal.findOneAndUpdate(conditions, { $addToSet: { 'usersLiked': username  } },
                    (err, meal) => {
                        console.log(meal);
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