const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  date: { type: Date, required: true },
  grades: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Grade' }],
}, { timestamps: true });

module.exports = mongoose.model('Exam', examSchema);
