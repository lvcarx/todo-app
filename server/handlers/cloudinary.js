const cloudinary = require('cloudinary')
cloudinary.config({
  cloud_name: process.env.ClOUDINARY_NAME, 
  api_key: process.env.ClOUDINARY_API, 
  api_secret: process.env.ClOUDINARY_API_SECRET 
})