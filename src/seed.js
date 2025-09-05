
const mongoose = require('mongoose');
const User = require('./models/User');
const Class = require('./models/Class');
const Subject = require('./models/Subject');
const Student = require('./models/Student');
const Teacher = require('./models/Teacher');
const Attendance = require('./models/Attendance');
const Exam = require('./models/Exam');
const Grade = require('./models/Grade');
const Fee = require('./models/Fee');
const dotenv = require('dotenv');
dotenv.config();

const bcrypt = require('bcryptjs');

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  await User.deleteMany();
  await Class.deleteMany();
  await Subject.deleteMany();
  await Student.deleteMany();
  await Teacher.deleteMany();
  await Attendance.deleteMany();
  await Exam.deleteMany();
  await Grade.deleteMany();
  await Fee.deleteMany();

  const hashedAdmin = await bcrypt.hash('admin123', 10);
  const hashedTeacher = await bcrypt.hash('teacher123', 10);
  const hashedStudent = await bcrypt.hash('student123', 10);
  const hashedParent = await bcrypt.hash('parent123', 10);

  const [admin, teacherUser1, teacherUser2, studentUser1, studentUser2, parentUser1, parentUser2] = await User.create([
    { name: 'Admin', email: 'admin@school.com', password: hashedAdmin, role: 'Admin' },
    { name: 'Teacher One', email: 'teacher1@school.com', password: hashedTeacher, role: 'Teacher' },
    { name: 'Teacher Two', email: 'teacher2@school.com', password: hashedTeacher, role: 'Teacher' },
    { name: 'Student One', email: 'student1@school.com', password: hashedStudent, role: 'Student' },
    { name: 'Student Two', email: 'student2@school.com', password: hashedStudent, role: 'Student' },
    { name: 'Parent One', email: 'parent1@school.com', password: hashedParent, role: 'Parent' },
    { name: 'Parent Two', email: 'parent2@school.com', password: hashedParent, role: 'Parent' },
  ]);

  const classA = await Class.create({ name: 'Class A', teacher: teacherUser1._id });
  const classB = await Class.create({ name: 'Class B', teacher: teacherUser2._id });

  const subjectMath = await Subject.create({ name: 'Mathematics', code: 'MATH101', teacher: teacherUser1._id });
  const subjectEng = await Subject.create({ name: 'English', code: 'ENG101', teacher: teacherUser2._id });

  const student1 = await Student.create({ user: studentUser1._id, class: classA._id, parent: parentUser1._id, rollNumber: '1' });
  const student2 = await Student.create({ user: studentUser2._id, class: classB._id, parent: parentUser2._id, rollNumber: '2' });

  await Teacher.create({ user: teacherUser1._id, classes: [classA._id], subjects: [subjectMath._id] });
  await Teacher.create({ user: teacherUser2._id, classes: [classB._id], subjects: [subjectEng._id] });

  await Attendance.create({ student: student1._id, date: new Date(), present: true, remarks: 'Present' });
  await Attendance.create({ student: student2._id, date: new Date(), present: false, remarks: 'Absent' });

  const exam1 = await Exam.create({ name: 'Midterm', subject: subjectMath._id, class: classA._id, date: new Date() });
  const exam2 = await Exam.create({ name: 'Final', subject: subjectEng._id, class: classB._id, date: new Date() });

  await Grade.create({ student: student1._id, exam: exam1._id, marks: 95, remarks: 'Excellent' });
  await Grade.create({ student: student2._id, exam: exam2._id, marks: 88, remarks: 'Good' });

  await Fee.create({ student: student1._id, amount: 1000, dueDate: new Date(), status: 'Unpaid', remarks: 'First installment' });
  await Fee.create({ student: student2._id, amount: 1200, dueDate: new Date(), status: 'Paid', remarks: 'Full payment' });

  console.log('Richer seed data for all collections inserted');
  mongoose.disconnect();
}

seed();
