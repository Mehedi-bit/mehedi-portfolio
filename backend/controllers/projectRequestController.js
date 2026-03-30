
const ProjectRequest = require('../models/ProjectRequest');




const getAllProjectRequests = async (req, res) => {
    try {
        const projectRequests = await ProjectRequest.find().sort({ createdAt: -1 });
        res.status(200).json(projectRequests);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}




const createProjectRequest = async (req, res) => {
    try {
        const { email, projectDetails } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required.' });
        }

        const newRequest = new ProjectRequest({
            email,
            projectDetails: projectDetails || 'No details provided',
        });

        const savedRequest = await newRequest.save();
        res.status(201).json(savedRequest);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}





const deleteProjectRequest = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedRequest = await ProjectRequest.findByIdAndDelete(id);

        if (!deletedRequest) {
            return res.status(404).json({ message: 'Project request not found.' });
        }

        res.status(200).json({ message: 'Project request deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}





module.exports = {
    getAllProjectRequests,
    createProjectRequest,
    deleteProjectRequest,
};