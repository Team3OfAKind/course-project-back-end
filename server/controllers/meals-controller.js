'use strict';

const PAGE_SIZE = 6;

module.exports = ({ data }) => {
    return {
        getAll(req, res) {
            console.log(req);
            data.getAllMeals()
                .then((meals) => {
                    res.json({ result: { meals } });
                })
        }
    };
};