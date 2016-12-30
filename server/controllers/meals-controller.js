'use strict';

const PAGE_SIZE = 6;

module.exports = ({ data }) => {
    return {
        getAll(req, res) {
            data.getAllMeals()
                .then((meals) => {
                    res.json({ result: { meals } });
                })
        },
        likeMeal(req,res){
            console.log('like');
            const username = req.user.username;
            const id = req.body._id;
             data.addUserToMeal(id, username)
                .then((meal) => {
                    console.log(meal);
                    if (!meal) {
                        throw new Error("No meal found!");
                    }
                    return data.addMealToUser(username, meal);
                })
                .then((user) => {
                    res.json({message: "Meal added to favourites!"});
                })
                // TODO: should error be catched
                // .catch((err) => {
                //     res.json({err});
                // });
        },
        dislikeMeal(req,res){
            const username = req.user.username;
            const id = req.body._id;
            const meal = req.body;
            console.log('dislike');
            console.log(req.user.favouriteMeals);
            console.log(id);
            data.removeUserFromMeal(id, username)
                .then((result) => {
                    //console.log(result);
                    return data.removeMealFromFavourites(username, meal);
                })
                .then((user) => {
                    //console.log(user);
                    res.json({message: "Meal removed from favourites!"});
                })
                // TODO: should error be catched                
                // .catch((err) => {
                //     res.json({err});
                // });
        }
    };
};