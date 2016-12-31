/* globals module require */
'use strict';

module.exports = function(models) {
    const Image = models.Image;
    const RestaurantInfo = models.RestaurantInfo;
    return {
        getAllImages() {
            return new Promise((resolve, reject) => {
                Image.find({}, function(err, images) {
                    if (err) {
                        return reject(err);
                    };

                    return resolve(images);
                });
            });
        },
        getRestaurantInfo(){
            return new Promise((resolve, reject) => {
                RestaurantInfo.find({}, function(err, info) {
                    if (err) {
                        return reject(err);
                    };

                    return resolve(info[0]);
                });
            });
        }
    };
};