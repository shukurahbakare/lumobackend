const mongoose = require('mongoose');
require('dotenv').config();


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Database connected');
  } catch (error) {
    console.log('Database connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
