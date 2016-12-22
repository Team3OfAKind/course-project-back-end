'use strict';

const PAGE_SIZE = 6;

module.exports = ({ data }) => {
    return {
        getAll(req, res) {
            var foods = data.getAllFoods()
                .then((foods) => {
                    res.json({ result: { foods } });
                })
        }
    };
};