const connectDB = require("../config/db")
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const dotenv = require("dotenv")
const path = require("path")
dotenv.config({path: path.resolve(__dirname, '../.env')})



// create seed admin (default credentials)


const run = async () => {

    await connectDB()

    const adminUser = await User.findOne({ role: 'admin' })

    if (adminUser) {
        console.log("Admin already exists")
        process.exit(0)
    }


    // hash the password
    const hashedPassword = await bcrypt.hash(process.env.DEFAULT_ADMIN_PASSWORD, 12)


    // create seed admin
    const admin = new User({
        name: process.env.DEFAULT_ADMIN_NAME,
        username: process.env.DEFAULT_ADMIN_USERNAME,
        email: process.env.DEFAULT_ADMIN_EMAIL,
        password: hashedPassword,
        role: 'admin'
    })


    await admin.save()

    console.log("Admin created successfully")
    process.exit(0)


}





run().catch(err => {
    console.error(err)
    process.exit(1)
})


