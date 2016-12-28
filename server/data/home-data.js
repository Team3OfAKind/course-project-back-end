/* globals module require */
'use strict';

module.exports = function(models) {
    const Image = models.Image;

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
        }
    };
};