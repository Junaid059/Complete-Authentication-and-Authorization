import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieparser from 'cookie-parser';
import AuthRoutes from './routes/Auth.js';
import AdminRoutes from './routes/Admin.js';

dotenv.config();

const app = express();

const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use(cookieparser());

app.use('/api/auth', AuthRoutes);
app.use('/api/admin', AdminRoutes);
const connectDB = mongoose
  .connect(process.env.MONGODB_URL)
  .then(console.log('MongoDb connected'))
  .catch((Error) => {
    console.log('Error is ', Error);
  });

app.listen(port, (req, res) => {
  console.log(`Server is running on port ${port}`);
});
