// School database seed script
// Run with: node seed.js
require('dotenv').config();
const mongoose = require('mongoose');

// Import models (adjust paths as needed)
const User = require('./src/models/User');
const Student = require('./src/models/Student');
const Teacher = require('./src/models/Teacher');
const Class = require('./src/models/Class');
const Subject = require('./src/models/Subject');
const Attendance = require('./src/models/Attendance');
const Grade = require('./src/models/Grade');
const Fee = require('./src/models/Fee');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/school';

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB');

  // Clear existing data
  await Promise.all([
    User.deleteMany({}),
    Student.deleteMany({}),
    Teacher.deleteMany({}),
    Class.deleteMany({}),
    Subject.deleteMany({}),
    Attendance.deleteMany({}),
    Grade.deleteMany({}),
    Fee.deleteMany({}),
  ]);

  // Create sample users
  const admin = await User.create({ name: 'Admin User', email: 'admin@school.com', password: 'admin123', role: 'Admin' });
  const teacherUser = await User.create({ name: 'Teacher One', email: 'teacher1@school.com', password: 'teach123', role: 'Teacher' });
  const studentUser = await User.create({ name: 'Student One', email: 'student1@school.com', password: 'stud123', role: 'Student' });
  const parentUser = await User.create({ name: 'Parent One', email: 'parent1@school.com', password: 'parent123', role: 'Parent' });

  // Create classes and subjects
  const classA = await Class.create({ name: 'Class A' });
  const math = await Subject.create({ name: 'Mathematics', code: 'MATH101' });
  const english = await Subject.create({ name: 'English', code: 'ENG101' });

  // Create teacher and student
  const teacher = await Teacher.create({ user: teacherUser._id, classes: [classA._id], subjects: [math._id, english._id] });
  const student = await Student.create({ user: studentUser._id, class: classA._id, parent: parentUser._id });

  // Add attendance
  await Attendance.create({ class: classA._id, date: '2025-08-21', student: student._id, status: 'Present' });

  // Add exam and grade
  const exam = await require('./src/models/Exam').create({
    class: classA._id,
    subject: math._id,
    name: 'Midterm',
    date: '2025-08-20'
  });
  await Grade.create({
    student: student._id,
    exam: exam._id,
    marks: 95
  });

  // Add fees
  await Fee.create({
    student: student._id,
    type: 'Tuition',
    amount: 500,
    status: 'Paid',
    dueDate: '2025-08-31'
  });

  console.log('Sample data seeded!');
  mongoose.disconnect();
}

seed().catch(err => { console.error(err); mongoose.disconnect(); });
