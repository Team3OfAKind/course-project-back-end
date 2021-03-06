'use strict';

const hashing = require('../utilities/encryptor');

module.exports = function (models, validator) {
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
        emptyCart(username) {
            return new Promise((resolve, reject) => {
                User.findOneAndUpdate({ 'username': username }, { $set: { 'cartMeals': [] } })
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
        },
        addUserAddress(username, address) {
            return new Promise((resolve, reject) => {
                User.findOneAndUpdate({ 'username': username }, { $addToSet: { 'addresses': address } })
                    .then(() => {
                        resolve();
                    }).catch(err => reject(err));
            });
        },
        removeUserAddress(username, address) {
            return new Promise((resolve, reject) => {
                User.findOneAndUpdate({ 'username': username }, { $pull: { 'addresses': address } })
                    .then(() => {
                        resolve();
                    }).catch(err => reject(err));
            });
        },
        addMealToUser(username, meal) { 
            console.log('like');
            return new Promise((resolve, reject) => {
                User.findOneAndUpdate({ 'username': username }, { $addToSet: { 'favouriteMeals': meal } },
                    (err, user) => {
                        if (err) {
                            return reject(err);
                        }
                        return resolve(user);
                    })
            });
        },
        removeMealFromFavourites(user, meal) {
            return new Promise((resolve, reject) => {
                const index = user.favouriteMeals.findIndex(x=>x._id+'' === meal._id+'');
                user.favouriteMeals.splice(index, 1);
                User.findOneAndUpdate({ 'username': user.username }, { 'favouriteMeals': user.favouriteMeals },(err, user) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(user);
                });
            });
        },
        getUserOrders(username) {
            return new Promise((resolve, reject) => {
                User.findOne({ 'username': username }, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    if (!user) {
                        return reject({ error: 'User not found' });
                    }

                    return resolve(user.orders);
                })
            });
        },
        addUserOrder(username, order) {
            return new Promise((resolve, reject) => {
                User.findOneAndUpdate({ 'username': username }, { $addToSet: { 'orders': order } })
                    .then(() => {
                        resolve();
                    }).catch(err => reject(err));
            });
        }
    }
}