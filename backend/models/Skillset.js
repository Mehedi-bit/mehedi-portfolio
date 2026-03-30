const mongoose = require('mongoose');


const skillsetSchema = new mongoose.Schema({
    
    frontend: [String],
    backend: [String],
    tools: [String],

}, {timestamps: true});



module.exports = mongoose.model('Skillset', skillsetSchema);