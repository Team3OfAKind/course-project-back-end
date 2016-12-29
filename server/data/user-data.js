'use strict';

const hashing = require('../utilities/encryptor');

module.exports = function(models, validator) {
    const User = models.User;

    return {
        getUserById(id) {
            return new Promise((resolve, reject) => {
                User.findOne({ '_id': id }, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    if (!user) {
                        return resolve(null);
                    }

                    return resolve(user);
                });
            })
        },
        getUserByUsername(username, asPersonalPage) {
            return new Promise((resolve, reject) => {
                User.findOne({ 'username': username }, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    if (!user) {
                        return reject({ error: 'User not found' });
                    }

                    return resolve(user);
                });
            });
        },
        createUser(user) {
            return new Promise((resolve, reject) => {

                const salt = hashing.getSalt(),
                    passHash = hashing.getPassHash(salt, user.passHash);
                if (!validator.isValidUser(user)) {
                    return reject({ error: 'Invalid information' });
                }
                const newUser = new User({
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    passHash: passHash,
                    salt: salt,
                    email: user.email,
                    image: user.image,
                    cartMeals: user.cartMeals,
                    addresses: user.addresses
                });

                newUser.save(err => {

                    if (err) {
                        return reject(err);
                    }

                    return resolve(newUser);
                });
            });
        },
        updateUserInformation(username, newInfo) {
            return new Promise((resolve, reject) => {
                User.findOneAndUpdate({ username }, newInfo,
                    (err, user) => {
                        if (err) {
                            return reject(err);
                        }
                        return resolve(user);
                    })
            });
        },
        getUserCartMeals(username) {
            return new Promise((resolve, reject) => {
                User.findOne({ 'username': username }, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    if (!user) {
                        return reject({ error: 'User not found' });
                    }

                    return resolve(user.cartMeals);
                })
            });
        },
        addMealToCart(username, meal) {
            return new Promise((resolve, reject) => {
                User.findOneAndUpdate({ 'username': username }, { $addToSet: { 'cartMeals': meal } })
                    .then(() => {
                        resolve();
                    }).catch(err => reject(err));
            });
        },
        removeMealFromCart(username, meal) {
            return new Promise((resolve, reject) => {
                User.findOneAndUpdate({ 'username': username }, { $pull: { 'cartMeals': meal } })
                    .then(() => {
                        resolve();
                    }).catch(err => reject(err));
            });
        },
        updateUserCartMealQuantity(username, mealName, changeBy) {
            return new Promise((resolve, reject) => {
                User.findOne({ 'username': username }, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    if (!user) {
                        return reject({ error: 'User not found' });
                    }

                    return resolve(user);

                }).then((user) => {

                    let meals = user.cartMeals;
                    meals.forEach(meal => {
                        if (meal.name === mealName) {
                            meal.quantity = +meal.quantity + changeBy;
                        }
                    })
                    User.findOneAndUpdate({ 'username': username }, { 'cartMeals': meals })
                        .then(() => {
                            resolve();
                        }).catch(err => reject(err));
                })
            });
        },
        getUserAddresses(username) {
            return new Promise((resolve, reject) => {
                User.findOne({ 'username': username }, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    if (!user) {
                        return reject({ error: 'User not found' });
                    }

                    return resolve(user.addresses);
                })
            });
        }
    }
}