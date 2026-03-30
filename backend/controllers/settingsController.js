const { uploadBase64Image } = require('../config/cloudinary');
const Settings = require('../models/Settings');



// Get all Settings or profile infos
const getSettings = async (req, res) => {
    let settings = await Settings.findOne({})

    // if does not exist, create empty one for not getting null
    if (!settings) {
        settings = await Settings.create({});
    }

    return res.status(200).json(settings);
}




// function for updating admin/portfolio owner infos
const updateAdmin = async (req, res) => {


    try {


        const {
            name,
            username,
            github,
            linkedin,
            email,
            facebook,
            phone,
            whatsapp,
            image
        } = req.body



        const settings = await Settings.findOne({})  ||  await Settings.create({});

        // ensure admin object exists
        if (!settings.admin) {
            settings.admin = {}
        }
    

        Object.assign(settings.admin, {
            name,
            username,
            github,
            linkedin,
            email,
            facebook,
            phone,
            whatsapp
        })  

        if (image) {
            settings.admin.image = await uploadBase64Image(image, "portfolio/admin")
        }

        await settings.save();
        
        return res.status(200).json(settings.admin);
       
    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error: error.message });
        
    }




}





// update hero section
const updateHero = async (req, res) => {
    const { title, description } = req.body;

    const settings = await Settings.findOne({})  ||  await Settings.create({}); 

    settings.hero = {title, description};

    await settings.save();
    res.status(200).json(settings.hero);
}




// update about section
const updateAbout = async (req, res) => {
    const { title, description, image } = req.body;

    const settings = await Settings.findOne({})  ||  await Settings.create({}); 

    if (title !== undefined) {
        settings.about.title = title;
    }

    if (description !== undefined) {
        settings.about.description = description;
    }

    if (image) {
        settings.about.image = await uploadBase64Image(image, "portfolio/about")
    }

    await settings.save();
    res.status(200).json(settings.about);
}



// get about infos
const getAbout = async (req, res) => {
    const settings = await Settings.findOne({})  ||  await Settings.create({}); 

    res.status(200).json(settings.about);
}


// update footer
const updateFooter = async (req, res) => {
    const { year, facebook, github, linkedin, email, phone, whatsapp } = req.body;

    const settings = await Settings.findOne({})  ||  await Settings.create({}); 

    settings.footer = {year, facebook, github, linkedin, email, phone, whatsapp};

    await settings.save();
    res.status(200).json(settings.footer);
}



// update contact pitch
const updateContactPitch = async (req, res) => {
    const { title, description, email, phone, location } = req.body;

    const settings = await Settings.findOne({})  ||  await Settings.create({}); 

    settings.contactPitch = {title, description, email, phone, location};

    await settings.save();
    res.status(200).json(settings.contactPitch);
}





module.exports = {
    getSettings,
    updateAdmin,
    updateHero,
    updateAbout,
    getAbout,
    updateFooter,
    updateContactPitch
}