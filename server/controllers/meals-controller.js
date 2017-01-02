'use strict';

const PAGE_SIZE = 6;
const DEFAULT_PAGE = 1;

module.exports = ({ data }) => {
    return {
        getAll(req, res) {
            data.getAllMeals()
                .then((meals) => {
                    res.json({ result: { meals } });
                })
        },
        getOnePage(req, res) {
            const page = Number(req.query.page || DEFAULT_PAGE);
            Promise.all([data.getMealsByPageSize({ page, pageSize: PAGE_SIZE }), data.getMealsCount()])
                .then(([meals, allMealsCount]) => {
                    const pages = Math.ceil(allMealsCount / PAGE_SIZE);

                    return res.json({
                        result: {
                            meals,
                            meal: req.meal,
                            params: { page, pages }
                        }
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        likeMeal(req, res) {
            console.log('like');
            const username = req.user.username;
            const id = req.body._id;
            const mealFromReq = req.body;
            mealFromReq.usersLiked.push(username);
            mealFromReq.likes += 1;
            const changedInfo = {
                usersLiked: mealFromReq.usersLiked,
                likes: mealFromReq.likes
            }
            console.log(req.body);
            data.addUserToMeal(id, changedInfo, username)
                .then((meal) => {
                    console.log(meal);
                    if (!meal) {
                        throw new Error("No meal found!");
                    }
                    return data.addMealToUser(username, meal);
                })
                .then((user) => {
                    res.json({ message: "Meal added to favourites!" });
                })
                .catch((err) => {
                    res.status(500).json({ error: { message: "Meal could not be added to favourites!" } });
                });
        },
        dislikeMeal(req, res) {
            const user = req.user;
            const id = req.body._id;
            const meal = req.body;
            let newLikes = meal.likes;
            const usernameIndex = meal.usersLiked.indexOf(user.username);
            if (usernameIndex >= 0) {
                meal.usersLiked.splice(usernameIndex, 1);
                newLikes -= 1;
            }

            const changedInfo = {
                usersLiked: meal.usersLiked,
                likes: newLikes
            }
            console.log('dislike');
            console.log(req.user.favouriteMeals);
            console.log(id);
            data.removeUserFromMeal(id, changedInfo)
                .then((result) => {
                    //console.log(result);
                    return data.removeMealFromFavourites(user, meal);
                })
                .then((user) => {
                    //console.log(user);
                    res.json({ message: "Meal removed from favourites!" });
                })
                .catch((err) => {
                    res.status(500).json({ error: { message: "Meal could not be removed to favourites!" } });
                });
        }
    };
};