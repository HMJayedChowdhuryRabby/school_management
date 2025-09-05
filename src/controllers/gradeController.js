const Grade = require('../models/Grade');
exports.createGrade = async (req, res) => {
  try {
    const { student, exam, marks, remarks } = req.body;
    const grade = await Grade.create({ student, exam, marks, remarks });
    const populatedGrade = await Grade.findById(grade._id)
      .populate({
        path: 'student',
        populate: { path: 'user', select: 'name' }
      })
      .populate('exam');
    res.status(201).json(populatedGrade);
  } catch (err) {
    res.status(500).json({ message: 'Error creating grade', error: err.message });
  }
};


exports.getAllGrades = async (req, res) => {
  try {
    const grades = await Grade.find()
      .populate({
        path: 'student',
        populate: { path: 'user', select: 'name' }
      })
      .populate('exam');
    res.json(grades);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteGrade = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Grade.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Grade not found' });
    }
    res.json({ message: 'Grade deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting grade', error: err.message });
  }
};
