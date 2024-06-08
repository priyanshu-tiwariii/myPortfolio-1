import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// Configuration
cloudinary.config({ 
    cloud_name:"dqdmdo5an",
    api_key: "824271169439122", 
    api_secret:"3IKs1_LhAQFjqkeeLuuhXjCSUus" 
});

const uploadFileOnCloudinary = async (filePath) => {
    try {
      
        if (!filePath) {
            return null;
        }
        // Upload the file to cloudinary
        const res = await cloudinary.uploader.upload(filePath, {
            resource_type: "auto",
        });
        if (res) {
            // Remove the file if it is uploaded
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
            return res;
        }
        
    } catch (error) {
       
        // Remove the file if it is not uploaded
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        return null;
    }
}

const deleteFileFromCloudinary = async (publicId) => {
    try {
        
        if (!publicId) {
            return null;
        }
        // Delete the file from cloudinary
        const res = await cloudinary.uploader.destroy(publicId);
       
        return res;
    } catch (error) {
        
        return null;
    }
}

export { uploadFileOnCloudinary, deleteFileFromCloudinary };
