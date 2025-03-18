import { v2 as cloudinary } from "cloudinary";
import fs from "fs";


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,  // Cloudinary Cloud Name
  api_key: process.env.CLOUDINARY_API_KEY,        // Cloudinary API Key
    api_secret: process.env.CLOUDINARY_API_SECRET   // Cloudinary API Secret
});

const uploadToCloudinary = async (localFilePath) => {
  try {
    if(!localFilePath) return null;
    const result = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    fs.unlinkSync(localFilePath);
    return result;   // Return the secure URL of the uploaded image
  } catch (error) {
    console.error(error);
    fs.unlinkSync(localFilePath);
    return null;
  } 
}



export default uploadToCloudinary;