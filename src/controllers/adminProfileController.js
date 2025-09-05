const AdminProfile = require('../models/AdminProfile');

exports.getProfiles = async (req, res) => {
  try {
    const profiles = await AdminProfile.find().sort({ createdAt: -1 });
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createProfile = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No image uploaded' });
    const { role, name, message } = req.body;
    const profile = new AdminProfile({
      role,
      name,
      message,
      photoUrl: `/uploads/${req.file.filename}`,
      filename: req.file.filename
    });
    await profile.save();
    res.status(201).json(profile);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    const profile = await AdminProfile.findByIdAndDelete(req.params.id);
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.json({ message: 'Profile deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
