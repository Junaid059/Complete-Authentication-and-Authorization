import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
    },

    email: {
      type: String,
      unique: true,
    },

    password: {
      type: String,
      unique: true,
    },

    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
  },
  { timestamps: true }
);

const User = new mongoose.model('User', userSchema);

export default User;
