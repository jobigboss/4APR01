// lib/mongodb.js
import mongoose from 'mongoose';
import 'dotenv/config'; // หรือ
require('dotenv').config();

const connectMongDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      return; 
    }

    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error", error);
  }
};

export { connectMongDB };
