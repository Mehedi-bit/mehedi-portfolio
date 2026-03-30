const {validationResult} = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



const createToken = (user)=> {
    return jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    ); 
}



// function to handle user signup

const signup = async (req, res) => {
    const errors = validationResult(req);

    // if there are validation errors (error is not empty), return 400 with errors
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    const { name, username, email, password, confirmPassword }  = req.body;

    
    if (password !== confirmPassword) {
        return res.status(400).json({ errors: [{ msg: 'Passwords do not match' }] });
    }


    // proceed with signup logic (e.g., save user to database)
    try {
        
        // check if user already exists in the database
        const user = await User.findOne({ $or: [ { email }, { username } ] });

        if (user) return res.status(400).json({ errors: [{ msg: 'User already exists' }] });


        // user not exists, create new user in the database

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            username,
            email,
            password: hashedPassword, // make sure to hash the password before saving   
            role: 'user'  // default role is 'user'
        });



        // generate the JWT token
        const token = createToken(newUser);


        // keep this token in cookie
        
        const isProd = process.env.NODE_ENV === "production";

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: isProd ? "none" : "lax", // none for prod cross-domain, lax for localhost
            secure: isProd,         // true only in production (HTTPS)
            maxAge: 7 * 24 * 60 * 60 * 1000
        });


        res.json({
            message: "User signed up successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role
            }
        })




    } catch (error) {
        console.error(error);
        res.status(500).json({ errors: [{ message: 'Server error' }] });
    }




}



// function to handle user login

const login = async (req, res) => {

    const { emailOrUsername, password } = req.body;

    try {

        // find user by email or username
        const user = await User.findOne({ $or: [ { email: emailOrUsername }, { username: emailOrUsername } ] });

        if (!user) {
            return res.status(400).json({ errors: [{ message: 'User not found' }] });
        }


        // compare password
        const isPassMatch = await bcrypt.compare(password, user.password);

        if (!isPassMatch) {
            return res.status(400).json({ errors: [{ message: 'Invalid credentials' }] });
        }

        // password matched, generate token
        const token = createToken(user);

        // set token in cookie
        const isProd = process.env.NODE_ENV === "production";

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: isProd ? "none" : "lax", // none for prod cross-domain, lax for localhost
            secure: isProd,         // true only in production (HTTPS)
            maxAge: 7 * 24 * 60 * 60 * 1000
        });


        res.json({
            message: "User logged in successfully",
            user: {
                id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                role: user.role
            }
        })
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ errors: [{ message: 'Server error' }] });
    }


}




// function to handle user logout
const logout = (req, res) => {

    const isProd = process.env.NODE_ENV === "production";

    res.clearCookie("token", {
        httpOnly: true,
        sameSite: isProd ? "none" : "lax",
        secure: isProd,
    });

    res.json({ message: "Logged out successfully" });
}







module.exports = {
    signup,
    login,
    logout
}