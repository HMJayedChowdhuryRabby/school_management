const Notice = require('../models/Notice');

// Get all notices
exports.getNotices = async (req, res) => {
  try {
    const notices = await Notice.find().sort({ date: -1 });
    res.json(notices);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch notices' });
  }
};

// Get single notice
exports.getNotice = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);
    if (!notice) return res.status(404).json({ error: 'Notice not found' });
    res.json(notice);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch notice' });
  }
};

// Create notice
exports.createNotice = async (req, res) => {
  try {
    const { title, description, pdfUrl } = req.body;
    const notice = new Notice({
      title,
      description,
      pdfUrl,
      createdBy: req.user?._id,
    });
    await notice.save();
    res.status(201).json(notice);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create notice' });
  }
};

// Update notice
exports.updateNotice = async (req, res) => {
  try {
    const { title, description, pdfUrl } = req.body;
    const notice = await Notice.findByIdAndUpdate(
      req.params.id,
      { title, description, pdfUrl },
      { new: true }
    );
    if (!notice) return res.status(404).json({ error: 'Notice not found' });
    res.json(notice);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update notice' });
  }
};

// Delete notice
exports.deleteNotice = async (req, res) => {
  try {
    const notice = await Notice.findByIdAndDelete(req.params.id);
    if (!notice) return res.status(404).json({ error: 'Notice not found' });
    res.json({ message: 'Notice deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete notice' });
  }
};
