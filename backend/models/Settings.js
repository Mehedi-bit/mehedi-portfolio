const mongoose = require('mongoose');
const SettingsSchema = new mongoose.Schema({
    admin: {
        name: String,
        username: String,
        image: { url: String, public_id: String },
        github: String,
        linkedin: String,
        email: String,
        facebook: String,
        phone: String,
        whatsapp: String
    },

    about: {
        title: String,
        description: String,
        image: { url: String, public_id: String }
    },

    hero: {
        title: String,
        description: String
    },

    footer: {
        year: Number,
        facebook: String,
        github: String,
        linkedin: String,
        email: String,
        phone: String,
        whatsapp: String
    },

    contactPitch: {
        title: String,
        description: String,
        email: String,
        phone: String,
        location: String
    }


    
}, { timestamps: true });




module.exports = mongoose.model('Settings', SettingsSchema)