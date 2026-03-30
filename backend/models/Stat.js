const mongoose = require('mongoose');


const statSchema = new mongoose.Schema({
    yearsOfExperience: String,
    projectsCompleted: String,
    happyClients: String,
    coffeeConsumed: String,
}, {timestamps: true});




module.exports = mongoose.model('Stat', statSchema);