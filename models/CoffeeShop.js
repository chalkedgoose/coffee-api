const mongoose = require('mongoose');

const CoffeeShopSchema =  
    new mongoose.Schema({
        title: {
            type: String, 
            required: true
        }, 
        description: {
            type: String, 
            required: true
        }, 
        longitude: {
            type: Number, 
            required: true
        }, 
        latitude: {
            type: Number, 
            required: true
        }
    });

module.exports = mongoose.model('coffeeshop', CoffeeShopSchema);