const express = require('express')
const router = express.Router();
const { body } = require('express-validator');
const { signup, login, logout } = require('../controllers/authController');



router.post('/signup', 
    [
        // simple validation middleware using express-validator
        body('username').notEmpty().trim(),
        body('email').isEmail().normalizeEmail(),
        body('password').isLength({ min: 6 }),
    ],
    
    // signup controller
    signup
    
);




router.post('/login', login)
router.post('/logout', logout)




module.exports = router;