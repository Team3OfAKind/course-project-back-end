'use strict';

const PAGE_SIZE = 6;

module.exports = ({ data }) => {
    return {
        getAll(req, res) {
            data.getAllMeals()
                .then((meals) => {
                    res.json({ result: { meals } });
                })
        }
    };
};