import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = () => {
  return mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log('Connected to database');
    })
    .catch((err) => {
      console.log('Connection error:', err);
    });
};

export default connectDB;
