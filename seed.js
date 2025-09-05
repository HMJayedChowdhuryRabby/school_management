// Admin database seed script for MongoDB Atlas
// Run with: node seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Import User model (adjust path if needed)
const User = require('./src/models/User');

const MONGO_URI = process.env.MONGO_URI;

async function seedAdmin() {
  if (!MONGO_URI) {
    console.error('MONGO_URI is not defined in environment variables!');
    process.exit(1);
  }

  // Connect to MongoDB Atlas
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB Atlas');

  // Check if admin already exists
  const existingAdmin = await User.findOne({ role: 'Admin' });
  if (existingAdmin) {
    console.log('Admin user already exists.');
    mongoose.disconnect();
    return;
  }

  // Hash admin password
  const hashedPassword = await bcrypt.hash('admin123', 10);

  // Create admin user
  const admin = await User.create({
    name: 'Admin User',
    email: 'admin@school.com',
    password: hashedPassword,
    role: 'Admin'
  });

  console.log('Admin user created successfully!');
  mongoose.disconnect();
}

seedAdmin().catch(err => {
  console.error(err);
  mongoose.disconnect();
});
