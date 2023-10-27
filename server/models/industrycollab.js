const mongoose = require('mongoose');

const cardsSchema = new mongoose.Schema({
    image : String,
    title : String
});

const Cards = mongoose.model('industrycollab', cardsSchema);
module.exports = Cards;