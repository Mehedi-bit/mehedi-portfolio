const mongoose = require('mongoose');



const projectRequestSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
    },

    projectDetails: {
        type: String,
        default: 'Project slot requested',
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },

})





module.exports = mongoose.model('ProjectRequest', projectRequestSchema);