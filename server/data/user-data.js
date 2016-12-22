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
                    const joinedCompetitions = [];
                    const attendedCompetitions = [];

                    user.competitions.forEach(c => {
                        if (c.attended) {
                            attendedCompetitions.push(c);
                        } else if (asPersonalPage) {
                            joinedCompetitions.push(c);
                        }
                    });

                    user.attendedCompetitions = attendedCompetitions;
                    if (asPersonalPage) {
                        user.joinedCompetitions = joinedCompetitions;
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
                    image: user.image
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
        }
    };
}