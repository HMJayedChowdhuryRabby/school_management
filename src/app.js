const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const errorHandler = require('./middleware/errorHandler');

// Load env
dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());

// ✅ Allow API requests from Netlify & Localhost
const allowedOrigins = [
  'http://localhost:5173',
  'https://transcendent-eclair-ffb8b4.netlify.app'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// ✅ Serve uploaded files with correct CORS headers
app.use('/uploads', (req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Credentials", "true");
  }
  res.header("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}, express.static(path.join(__dirname, '../public/uploads')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/user'));
app.use('/api/teachers', require('./routes/teacher'));
app.use('/api/teachers/upload', require('./routes/teacherUpload'));
app.use('/api/classes', require('./routes/class'));
app.use('/api/subjects', require('./routes/subject'));
app.use('/api/students', require('./routes/student'));
app.use('/api/attendance', require('./routes/attendance'));
app.use('/api/exams', require('./routes/exam'));
app.use('/api/grades', require('./routes/grade'));
app.use('/api/fees', require('./routes/fee'));
app.use('/api/notices', require('./routes/notice'));
app.use('/api/upload', require('./routes/upload'));
app.use('/api/gallery', require('./routes/gallery'));
app.use('/api/admin-profiles', require('./routes/adminProfile'));
app.use('/api/banner-images', require('./routes/bannerImage'));
// ...existing code for other routes...

// Error handler
app.use(errorHandler);

module.exports = app;
