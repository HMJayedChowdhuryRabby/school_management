const Gallery = require('../models/Gallery');
const path = require('path');

exports.getImages = async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const image = new Gallery({
      url: `/uploads/${req.file.filename}`,
      filename: req.file.filename,
      uploadedBy: req.user._id
    });
    await image.save();
    res.status(201).json(image);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const image = await Gallery.findByIdAndDelete(req.params.id);
    if (!image) return res.status(404).json({ message: 'Image not found' });
    // Optionally delete file from disk
    res.json({ message: 'Image deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
