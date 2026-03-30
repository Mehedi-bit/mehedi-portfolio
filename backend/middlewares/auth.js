const jwt = require('jsonwebtoken');
const User = require('../models/User');


const authMiddleware = async (req, res, next) => {
    

    try {

        const token = req.cookies?.token ||
                        req.headers?.authorization?.split(' ')[1];
        
        if (!token) return res.status(401).json({ message: 'Unauthorized' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);


        const user = await User.findById(decoded.userId).select('-password');

        if (!user) return res.status(401).json({ message: 'User not found' });

        // attaching authenticated user info to the request, 
        // so any route after this middleware can use it.
        req.user = user;

        next();

    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}



const requireAdmin = async (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

    if (req.user.role !== 'admin') return res.status(403).json({ message: 'You cannot enter this room - this is for admin only' });

    next();
}






module.exports = { 
    authMiddleware, 
    requireAdmin 
};