const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
    image:String,
    title:String,
    designation:String,
    description:String,
});

const Cards = mongoose.model('facluty', facultySchema);
module.exports = Cards;