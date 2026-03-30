const Stat = require('../models/Stat');


const getStats = async (req, res) => {
    let stats = await Stat.findOne();
    if (!stats) {
        stats = await Stat.create({
            yearsOfExperience: "0+",
            projectsCompleted: "0+",
            happyClients: "0+",
            coffeeConsumed: "0+"
        });
    }

    res.status(200).json(stats);
}





const updateStats = async (req, res) => {
    const { yearsOfExperience, projectsCompleted, happyClients, coffeeConsumed } = req.body;

    let stats = await Stat.findOne();

    if (!stats) {
            stats = await Stat.create({
            yearsOfExperience: yearsOfExperience || "0+",
            projectsCompleted: projectsCompleted || "0+",
            happyClients: happyClients || "0+",
            coffeeConsumed: coffeeConsumed || "0+"
        });
    } else {
        stats.yearsOfExperience = yearsOfExperience || stats.yearsOfExperience;
        stats.projectsCompleted = projectsCompleted || stats.projectsCompleted;
        stats.happyClients = happyClients || stats.happyClients;
        stats.coffeeConsumed = coffeeConsumed || stats.coffeeConsumed;

        await stats.save();
    }

    res.status(200).json(stats);
}





module.exports = {
    getStats,
    updateStats
}