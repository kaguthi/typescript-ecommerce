import { uploadImage } from "../utils/cloudinary.js";

export const uploadController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const result = await uploadImage(req.file.path, {
      folder: 'uploads',
      resource_type: 'auto'
    });

    res.status(200).json({
      message: "File uploaded successfully",
      url: result.secure_url,
      publicId: result.public_id
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "File upload failed", error: error.message });
  }
}