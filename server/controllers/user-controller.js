'use strict';

module.exports = ({ data }) => {
    return {
        getProfile(req, res) {
            res.json({ result: { name: 'Pesho' } });
        },
        editProfile(req, res) {
            const username = req.params.username;

            const userInfo = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                birthDate: req.body.birthDate,
                email: req.body.email
            };

            if (req.file) {
                userInfo.image = req.file.filename;
            }
            data.updateUserInformation(username, userInfo)
                .then(() => {
                    return res.json({result: {success: true}})
                });
        },
        getCart(req, res) {
            const username = req.params.username;

            data.getUserCartProducts(username)
                .then((products) => {
                    res.json({ result: { products } });
                })
        }
    }
}