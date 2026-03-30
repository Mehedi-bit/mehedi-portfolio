const mongoose = require('mongoose');



const projectSchema = new mongoose.Schema({
    
    title: {
        type: String,
        required: true,
    },
    description: String,
    techs: [String],
    github: String,
    liveLink: String,
    image: {
        public_id: { type: String, default: "" },
        url: { type: String, default: "" }
    },
    
    order: {
        type: Number,
        default: 0,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },

}, {timestamps: true});





module.exports = mongoose.model('Project', projectSchema);