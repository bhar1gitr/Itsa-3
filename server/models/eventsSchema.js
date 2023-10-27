const mongoose = require('mongoose');

const cardsSchema = new mongoose.Schema({
    image : String,
    comming_soon : { type: Boolean,default:true},
    title : String,
    description : String
});

const Cards = mongoose.model('event', cardsSchema);
module.exports = Cards;