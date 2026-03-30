const { uploadBase64Image } = require('../config/cloudinary');
const Project = require('../models/Project');


const getAllProjects = async (req, res) => {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json(projects);
}




const createProject = async (req, res) => {
    try {
        const { title, description, techs, github, liveLink, order, image } = req.body;

        const projectData = {
            title,
            description,
            techs: techs || [],
            github,
            liveLink,
            order,
        };

        if (image) {
            projectData.image = await uploadBase64Image(
                image,
                "portfolio/projects"
            );
        }

        const project = new Project(projectData);

        await project.save();
        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};




const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const body = { ...req.body }; // clone for safety

        if (body.image) {
            body.image = await uploadBase64Image(
                body.image,
                "portfolio/projects"
            );
        } else {
            delete body.image; // don't override existing image
        }

        const project = await Project.findByIdAndUpdate(
            id,
            body,
            { new: true, runValidators: true }
        );

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};





const deleteProject = async (req, res) => {

    const { id } = req.params;
    await Project.findByIdAndDelete(id);
    res.status(200).json({ message: 'Project deleted successfully' });

}






module.exports = {
    getAllProjects,
    createProject,
    updateProject,
    deleteProject
}