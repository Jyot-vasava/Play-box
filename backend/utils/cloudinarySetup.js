import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary with the credentials
cloudinary.config({
  cloud_name: "playboxx",
  api_key: "151988823294464",
  api_secret: "-X-lMU5bZ5du6iDf6ftShKGFDE4",
});

// Function to upload a file buffer to Cloudinary using a stream
const uploadToCloudinary = (fileBuffer, resourceType) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: resourceType },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    uploadStream.end(fileBuffer);
  });
};

export default uploadToCloudinary;