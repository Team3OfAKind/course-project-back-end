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
            console.log('getCart');
            const username = req.params.username;

            data.getUserCartMeals(username)
                .then((products) => {
                    res.json({ result: { products } });
                })
        }, 
        addToCart(req, res) {
            console.log('addToCart');
            const username = req.params.username;
            const meal = req.body;
            let updated = false;
            console.log(username);
            console.log(meal);
            data.getUserCartProducts(username)
                .then((products) => {
                    products.forEach(pr => {
                        if (pr.name === meal.name){
                            console.log('NAME:' + pr.name);
                            data.updateUserCartMealQuantity(username, meal.name, 1)
                                .then(() => {
                                    updated = true;
                                    return res.json({result: {success: true}});
                                });
                        }
                    })
                }).then(() => {
                    if (!updated) {
                        console.log('here');
                        data.addMealToCart(username, meal)
                            .then(() => {
                                return res.json({result: {success: true}});
                            })
                    }
                })
        }
    }
}