const ContactMessage = require('../models/ContactMessage');


const getAllMessages = async (req, res) => {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
}



const sendMessage = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        const newMessage = new ContactMessage({
            name,
            email,
            message,
        });

        await newMessage.save();

        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ message: 'Failed to send message', error: error.message });
    }
}







const deleteMessage = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedMessage = await ContactMessage.findByIdAndDelete(id);

        if (!deletedMessage) {
            return res.status(404).json({ message: 'Message not found' });
        }

        res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete message', error: error.message });
    }
}






module.exports = {
    getAllMessages,
    sendMessage,
    deleteMessage,
}