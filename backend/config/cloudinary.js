const cloudinary = require("cloudinary").v2

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


const uploadBase64Image = async (base64Str, folder = "portfolio") => {
    if (!base64Str) return null;

    const result = await cloudinary.uploader.upload(base64Str, {
        folder,
        transformation: [{ width: 1000, crop: "limit" }]
    })

    return {
        public_id: result.public_id,
        url: result.secure_url,
    }
}



module.exports = { uploadBase64Image }


