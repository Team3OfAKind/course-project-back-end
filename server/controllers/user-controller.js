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
                email: req.body.email
            };

            data.updateUserInformation(username, userInfo)
                .then(() => {
                    return res.json({ result: { success: true, message: 'Profile information updated!' } });
                })
                .catch(() => {
                    return res.status(500).json({ error: { message: "User information could not be updated" } })
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
                    return res.json({ result: { success: true, message: 'Address added' } });
                })
        },
        removeAddress(req, res) {
            const username = req.user.username;
            const address = req.body;
            data.removeUserAddress(username, address)
                .then(() => {
                    return res.json({ result: { success: true, message: 'Address removed' } });
                })
        },
        addToCart(req, res) {
            const username = req.user.username;
            const meal = req.body;

            data.addMealToCart(username, meal)
                .then(() => {
                    return res.json({ result: { success: true, message: 'Meal added to cart' } });
                })
                .catch(()=>{
                    return res.status(500).json({error: {message: 'Meal could not be added to cart.'}});
                });
        },
        updateMealCartQuantity(req, res) {
            const username = req.user.username;
            const mealName = req.body.name;
            const changeBy = req.body.changeBy;

            data.updateUserCartMealQuantity(username, mealName, changeBy)
                .then(() => {
                    return res.json({ result: { success: true, message: 'Meal quantity updated' } });
                })

        },
        removeFromCart(req, res) {
            const username = req.user.username;
            const meal = req.body;

            data.removeMealFromCart(username, meal)
                .then(() => {
                    return res.json({ result: { success: true, message: 'Meal removed from cart' } });
                })
        },
        getOrders(req, res) {
            const username = req.user.username;
            data.getUserOrders(username)
                .then((orders) => {
                    res.json({ result: { orders } });
                })
        },
        addOrder(req, res) {
            const username = req.user.username;
            const order = req.body;
            data.emptyCart(username)
                .then(() => {
                    data.addUserOrder(username, order)
                        .then(() => {
                            return res.json({ result: { success: true, message: 'Order placed successfully' } });
                        })
                })
        }
    }
}