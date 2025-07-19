// utils/cloudinary.js
import { v2 as cloudinary } from 'cloudinary';
import 'dotenv/config';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


export function uploadImage(src, options = {}) {
  if (Buffer.isBuffer(src)) {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(options, (err, result) =>
        err ? reject(err) : resolve(result)
      );
      stream.end(src);
    });
  }
  if (typeof src === 'string') {
      return cloudinary.uploader.upload(src, options);
    }

  throw new Error("Invalid image source. Must be a Buffer or a file path/URL string.");
}

export const deleteImage = (publicId, options = {}) =>
  cloudinary.uploader.destroy(publicId, options);

