'use strict';

module.exports = ({ data }) => {
    return {
        getProfile(req, res) {
            res.json({ result: { user: req.user } });
        },
        editProfile(req, res) {
            const username = req.user.username;

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
            const username = req.user.username;
            console.log("get meals " + username);
            data.getUserCartMeals(username)
                .then((meals) => {
                    res.json({ result: { meals } });
                })
        }, 
        getAddresses(req, res) {
            const username = req.user.username;
            data.getUserAddresses(username)
                .then((addresses) => {
                    res.json({ result: { addresses } });
                })
        },
        addAddress(req, res) {
            const username = req.user.username;
            const address = req.body;
            data.addUserAddress(username, address)
                .then(() => {
                   return res.json({result: {success: true, message: 'Address added'}}); 
                })
        },
        addToCart(req, res) {
            const username = req.user.username;
            const meal = req.body;
            let updated = false;
            data.getUserCartMeals(username)
                .then((products) => {
                    products.forEach(pr => {
                        if (pr.name === meal.name){
                            data.updateUserCartMealQuantity(username, meal.name, 1)
                                .then(() => {
                                    updated = true;
                                    return res.json({result: {success: true, message: 'Meal added to cart'}});
                                });
                        }
                    })
                }).then(() => {
                    if (!updated) {
                        data.addMealToCart(username, meal)
                            .then(() => {
                                return res.json({result: {success: true, message: 'Meal added to cart'}});
                            })
                    }
                })
        },
        updateMealCartQuantity(req, res) {
            const username = req.user.username;
            const mealName = req.body.name;
            const changeBy = req.body.changeBy;

            data.updateUserCartMealQuantity(username, mealName, changeBy)
                .then(() => {
                    return res.json({result: {success: true, message: 'Meal quantity updated'}});
                })

        },
        removeFromCart(req, res) {
            const username = req.user.username;
            const meal = req.body;

            data.removeMealFromCart(username, meal)
                .then(() => {
                    return res.json({result: {success: true, message: 'Meal removed from cart'}});
                })
        }
    }
}