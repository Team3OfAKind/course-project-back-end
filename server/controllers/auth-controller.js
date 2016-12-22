'use strict';

module.exports = ({ data, passport }) => {
    return {
        register(req, res) {
            const user = {
                username: req.body.username,
                passHash: req.body.password,
                salt: req.body.salt,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                image: 'http://www.bathspa.ac.uk/media/WebProfilePictures/default_profile.jpg',
                email: req.body.email,
            };

            data.createUser(user)
                .then(() => {
                    res.json({ success: 'Registration successfull' });
                })
                .catch(() => {
                    // TODO: redirect to another page
                    res.json({ error: 'Registration failed' });
                });
        },
        loginLocal(req, res, next) {
            const auth = passport.authenticate('local', (err, user) => {
                if (err) {
                    return res.json({ error: 'Invalid username or password' });
                    // next(err);
                    // return;
                }

                if (!user) {
                    res.json({ error: 'Invalid username or password' });
                    return;
                }

                req.login(user, err => {
                    if (err) {
                        next(err);
                        return;
                    }
                    res.status(201).json({ success: 'Login successfull' });
                });
            });

            auth(req, res, next);
        },
        logout(req, res) {
            req.logout();
            res.json({ result: { success: true } });
        }
    }
}