'use strict';

module.exports = function({data}) {
    return {
        getGallery(req,res){
            data.getAllImages()
                .then(images=>{
                    res.json({result: {photos:images}});
                })
                .catch(err=>{
                    res.json({message: 'Photos not found'});
                });
        }
    };
};