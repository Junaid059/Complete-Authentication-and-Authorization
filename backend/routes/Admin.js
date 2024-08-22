import express from 'express';
import { getUser, deleteUser } from '../controllers/Admin.js';
import isAdmin from '../middleware/verifyToken.js';

const AdminRoute = express.Router();

AdminRoute.get('/getuser', isAdmin, getUser);
AdminRoute.delete('/delete/:id', isAdmin, deleteUser);

export default AdminRoute;
