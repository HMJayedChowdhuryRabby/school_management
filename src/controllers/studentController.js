const Student = require('../models/Student');


exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find()
      .populate({ path: 'user', select: 'name email' })
      .populate({ path: 'class', select: 'name', populate: { path: 'teacher', select: 'name' } })
      .populate({ path: 'parent', select: 'name email' });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const User = require('../models/User');



exports.createStudent = async (req, res) => {
  try {
    const { name, email, password, class: classId, rollNumber, parentName } = req.body;
    // Create user for student
    const user = await User.create({ name, email, password, role: 'Student' });
    let parentId = undefined;
    if (parentName) {
      // Create parent user with default email/password
      const parentEmail = `${parentName.replace(/\s+/g, '').toLowerCase()}@school.com`;
      const parentPassword = 'parent123';
      const parentUser = await User.create({ name: parentName, email: parentEmail, password: parentPassword, role: 'Parent' });
      parentId = parentUser._id;
    }
    // Create student document
    const student = await Student.create({ user: user._id, class: classId, rollNumber, parent: parentId });
    const populatedStudent = await Student.findById(student._id)
      .populate({ path: 'user', select: 'name email' })
      .populate({ path: 'class', select: 'name', populate: { path: 'teacher', select: 'name' } })
      .populate({ path: 'parent', select: 'name email' });
    res.status(201).json(populatedStudent);
  } catch (err) {
    res.status(500).json({ message: 'Error creating student', error: err.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Student.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting student', error: err.message });
  }
};
