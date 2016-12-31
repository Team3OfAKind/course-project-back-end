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
        },
        getRestaurantInfo(req,res){
             data.getRestaurantInfo()
                .then(info=>{
                    res.json({result: {info}});
                })
                .catch(err=>{
                    res.json({message: 'Information not found'});
                });
        },
        getRestaurantContacts(req,res){
             data.getRestaurantInfo()
                .then(info=>{
                    res.json({result: {contacts: info.contacts}});
                })
                .catch(err=>{
                    res.json({message: 'Information not found'});
                });
        }
    };
};