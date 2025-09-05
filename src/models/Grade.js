const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  exam: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
  marks: { type: Number, required: true },
  remarks: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Grade', gradeSchema);
