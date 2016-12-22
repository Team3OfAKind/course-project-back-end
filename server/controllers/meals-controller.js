'use strict';

const PAGE_SIZE = 6;

module.exports = ({ data }) => {
    return {
        getAll(req, res) {
            var foods = data.getAllMeals()
                .then((foods) => {
                    res.json({ result: { foods } });
                })
        }
    };
};