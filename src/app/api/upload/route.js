import multer from 'multer';
import fs from 'fs';
import path from 'path';

// Set up multer to save files in a 'public/img_rec' folder
const upload = multer({
  dest: './public/img_rec/', // Path to save the uploaded files
  limits: { fileSize: 5 * 1024 * 1024 }, // Optional: Limit file size to 5MB
});

// Disable Next.js's default body parser for file upload
export const config = {
  api: {
    bodyParser: false, // Disable bodyParser for file upload handling
  },
};

export default function handler(req, res) {
  // Use the multer middleware to handle the upload
  upload.single('file')(req, res, (err) => {
    if (err) {
      // Handle errors
      return res.status(500).json({ success: false, message: 'Error uploading file' });
    }

    // File upload success
    const file = req.file;
    const filePath = path.join('./public/img_rec', file.filename); // Get the file path

    // You can now store the file path in your database or return the response
    return res.status(200).json({
      success: true,
      message: 'File uploaded successfully',
      filePath, // Return the path of the uploaded file
    });
  });
}
