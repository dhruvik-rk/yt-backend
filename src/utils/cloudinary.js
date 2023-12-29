//(1)upload file to local server with help of multer
//(2)upload file from local server to cloud with help of cloudinary
//(3)remove file from local server

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
}); //copy this data from cloudinary website

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null
        //upload file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        //file is uploaded successfully
        console.log("file uploaded on cloudinary - ", response.url);
        return response;
    } catch (error) {
        //remove locally save file if upload operation fail
        fs.unlinkSync(localFilePath)
        return null;
    }
}

export { uploadOnCloudinary }

// cloudinary.v2.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//     { public_id: "olympic_flag" }, 
//     function(error, result) {console.log(result); }
// );