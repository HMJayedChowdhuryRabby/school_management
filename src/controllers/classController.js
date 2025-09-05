const Class = require('../models/Class');

exports.getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find().populate({
      path: 'teacher',
      populate: { path: 'user', select: 'name email' }
    });
    res.json(classes);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


exports.createClass = async (req, res) => {
  try {
    const { name, teacher } = req.body;
    const newClass = await Class.create({ name, teacher });
    const populatedClass = await Class.findById(newClass._id).populate({ path: 'teacher', select: 'name email' });
    res.status(201).json(populatedClass);
  } catch (err) {
    res.status(500).json({ message: 'Error creating class', error: err.message });
  }
};

exports.deleteClass = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Class.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.json({ message: 'Class deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting class', error: err.message });
  }
};
