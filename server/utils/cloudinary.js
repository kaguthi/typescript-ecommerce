import { v2 as cloudinary } from 'cloudinary';
import 'dotenv/config'; 
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET
});

export const uploadImage = (filePath, options = {}) =>
  cloudinary.uploader.upload(filePath, options);   // → resolves to the upload result

export const deleteImage = (publicId, options = {}) =>
  cloudinary.uploader.destroy(publicId, options);

