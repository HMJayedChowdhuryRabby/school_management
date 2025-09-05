// POST /api/teachers/upload (with photo and subjects)
exports.createTeacherWithPhoto = async (req, res) => {
  try {
    const { name, email, password, subjects } = req.body;
    let photoUrl = '';
    if (req.file) {
      photoUrl = `/uploads/teacher/${req.file.filename}`;
    }
    // Create user for teacher with photo in profile
    const user = await User.create({
      name,
      email,
      password,
      role: 'Teacher',
      profile: { photoUrl },
    });
    // Create teacher document with subjects
    const teacher = await Teacher.create({
      user: user._id,
      subjects: subjects ? JSON.parse(subjects) : [],
    });
    const populatedTeacher = await Teacher.findById(teacher._id).populate('user').populate('subjects');
    res.status(201).json(populatedTeacher);
  } catch (err) {
    res.status(500).json({ message: 'Error creating teacher', error: err.message });
  }
};
const User = require('../models/User');

// POST /api/teachers
exports.createTeacher = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Create user for teacher
    const user = await User.create({ name, email, password, role: 'Teacher' });
    // Create teacher document
    const teacher = await Teacher.create({ user: user._id });
    const populatedTeacher = await Teacher.findById(teacher._id).populate('user');
    res.status(201).json(populatedTeacher);
  } catch (err) {
    res.status(500).json({ message: 'Error creating teacher', error: err.message });
  }
};
const Teacher = require('../models/Teacher');


// GET /api/teachers
exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find().populate('user').populate('subjects');
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE /api/teachers/:id
exports.deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Teacher.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.json({ message: 'Teacher deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting teacher', error: err.message });
  }
};
