const mongoose = require('mongoose');

const adminProfileSchema = new mongoose.Schema({
  role: { type: String, required: true },
  name: { type: String, required: true },
  message: { type: String, required: true },
  photoUrl: { type: String, required: true },
  filename: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AdminProfile', adminProfileSchema);
