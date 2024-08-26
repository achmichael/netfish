import express from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import fs from "fs";

const imageRouter = express.Router();

// Konfigurasi Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Inisialisasi Multer untuk penyimpanan sementara
const upload = multer({ dest: "uploads/" });

imageRouter.post("/upload-image", upload.single("file"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "product_images",
    });

    fs.unlink(req.file.path, (err) => {
      if (err) console.error("Error deleting file:", err);
    });

    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      data: result.secure_url,
    });
  } catch (error) {
    console.log("Upload error:", error); // Tambahkan log untuk debug
    res.status(500).json({ message: error.message });
  }
});

export default imageRouter;
