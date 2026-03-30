const Skillset = require("../models/Skillset")


const getAllSkills = async (req, res) => {

    let skills = await Skillset.findOne()
    
    if (!skills) {
        skills = await Skillset.create({
            frontend: [],
            backend: [],
            tools: []
        })
    }


    res.status(200).json(skills)

}






const updateSkills = async (req, res) => {
    const { frontend, backend, tools } = req.body;

    let skills = await Skillset.findOne();

    if (!skills) {
        skills = new Skillset({
            frontend: frontend || [],
            backend: backend || [],
            tools: tools || []
        });
    } else {
        skills.frontend = frontend || skills.frontend;
        skills.backend = backend || skills.backend;
        skills.tools = tools || skills.tools;

        await skills.save();
    }


    res.status(200).json(skills)
    
}






module.exports = {
    getAllSkills,
    updateSkills
}