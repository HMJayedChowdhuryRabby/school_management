// Admin database seed script for MongoDB Atlas
// Run with: node seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
 
// Import User model (adjust path if needed)
const User = require('./src/models/User');

const MONGO_URI = process.env.MONGO_URI;

async function seedAdmins() {
  if (!MONGO_URI) {
    console.error('MONGO_URI is not defined in environment variables!');
    process.exit(1);
  }

  // Connect to MongoDB Atlas
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB Atlas');

  // Define admin users
  const admins = [
    { name: 'Admin One', email: 'admin@school.com', password: 'admin123' },
    { name: 'Admin Two', email: 'admin2@school.com', password: 'admin234' },
    { name: 'Admin Three', email: 'admin3@school.com', password: 'admin345' },
  ];

  for (let adminData of admins) {
    const existingAdmin = await User.findOne({ email: adminData.email });
    if (existingAdmin) {
      console.log(`Admin ${adminData.email} already exists, skipping.`);
      continue;
    }


    // Create admin (plain password, pre-save hook will hash it)
    await User.create({
      name: adminData.name,
      email: adminData.email,
      password: adminData.password,
      role: 'Admin'
    });

    console.log(`Admin ${adminData.email} created successfully.`);
  }

  mongoose.disconnect();
  console.log('Seeding complete.');
}

seedAdmins().catch(err => {
  console.error(err);
  mongoose.disconnect();
});
