exports.createExam = async (req, res) => {
  try {
    const { name, subject, class: classId, date } = req.body;
    const exam = await Exam.create({ name, subject, class: classId, date });
    const populatedExam = await Exam.findById(exam._id).populate('subject class');
    res.status(201).json(populatedExam);
  } catch (err) {
    res.status(500).json({ message: 'Error creating exam', error: err.message });
  }
};
const Exam = require('../models/Exam');


exports.getAllExams = async (req, res) => {
  try {
    const exams = await Exam.find().populate('subject class');
    res.json(exams);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteExam = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Exam.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Exam not found' });
    }
    res.json({ message: 'Exam deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting exam', error: err.message });
  }
};
