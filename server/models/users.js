const mongoose = require('mongoose');

const cardsSchema = new mongoose.Schema({
    name:String,
    email : String,
    password : String
});

const Cards = mongoose.model('user', cardsSchema);
module.exports = Cards;