exports.createFee = async (req, res) => {
  try {
    const { student, amount, dueDate, status, remarks } = req.body;
    const fee = await Fee.create({ student, amount, dueDate, status, remarks });
    const populatedFee = await Fee.findById(fee._id).populate('student');
    res.status(201).json(populatedFee);
  } catch (err) {
    res.status(500).json({ message: 'Error creating fee', error: err.message });
  }
};
const Fee = require('../models/Fee');


exports.getAllFees = async (req, res) => {
  try {
    const fees = await Fee.find().populate('student');
    res.json(fees);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteFee = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Fee.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Fee not found' });
    }
    res.json({ message: 'Fee deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting fee', error: err.message });
  }
};
