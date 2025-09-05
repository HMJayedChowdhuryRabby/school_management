const Subject = require('../models/Subject');


exports.getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find()
      .populate({
        path: 'teacher',
        populate: { path: 'user', select: 'name email' }
      })
      .populate({
        path: 'classes',
        select: 'name'
      });
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


exports.createSubject = async (req, res) => {
  try {
    const { name, code, teacher, classes } = req.body;
    const newSubject = await Subject.create({ name, code, teacher, classes });
    const populatedSubject = await Subject.findById(newSubject._id)
      .populate({ path: 'teacher', populate: { path: 'user', select: 'name email' } })
      .populate({ path: 'classes', select: 'name' });
    res.status(201).json(populatedSubject);
  } catch (err) {
    res.status(500).json({ message: 'Error creating subject', error: err.message });
  }
};

exports.deleteSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Subject.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Subject not found' });
    }
    res.json({ message: 'Subject deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting subject', error: err.message });
  }
};
