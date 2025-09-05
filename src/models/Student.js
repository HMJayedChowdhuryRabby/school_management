const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
  rollNumber: { type: String },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }],
  attendance: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Attendance' }],
  grades: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Grade' }],
  fees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Fee' }],
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
