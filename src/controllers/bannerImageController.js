const BannerImage = require('../models/BannerImage');
const path = require('path');

exports.getBannerImages = async (req, res) => {
  try {
    const images = await BannerImage.find().sort({ uploadedAt: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.uploadBannerImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const url = `/uploads/banner/${req.file.filename}`;
    const image = await BannerImage.create({ url, uploadedBy: req.user?._id });
    res.status(201).json(image);
  } catch (err) {
    res.status(500).json({ message: 'Error uploading image', error: err.message });
  }
};

exports.deleteBannerImage = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await BannerImage.findByIdAndDelete(id);
    if (!image) return res.status(404).json({ message: 'Image not found' });
    // Optionally: remove file from disk
    res.json({ message: 'Image deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting image', error: err.message });
  }
};
