const Attendance = require('../models/Attendance');

exports.getAllAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find()
      .populate({
        path: 'student',
        populate: { path: 'user', select: 'name' }
      });
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


exports.createAttendance = async (req, res) => {
  try {
    const { student, date, status, remarks } = req.body;
    const attendance = await Attendance.create({ student, date, status, remarks });
    const populatedAttendance = await Attendance.findById(attendance._id)
      .populate({
        path: 'student',
        populate: { path: 'user', select: 'name' }
      });
    res.status(201).json(populatedAttendance);
  } catch (err) {
    res.status(500).json({ message: 'Error creating attendance', error: err.message });
  }
};

exports.deleteAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Attendance.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Attendance not found' });
    }
    res.json({ message: 'Attendance deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting attendance', error: err.message });
  }
};
