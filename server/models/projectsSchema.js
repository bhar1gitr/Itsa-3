const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title:String,
    description:String,
    team_leader: String,
    team_member1: String,
    team_member2: String,
    team_member3: String,
    year: String,
    date: String,
    githublink: String,
});

const Cards = mongoose.model('project', projectSchema);
module.exports = Cards;