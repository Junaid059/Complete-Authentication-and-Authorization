import jwt from 'jsonwebtoken';
import User from '../models/User.js';
const isAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    const user = await User.findById(decoded.userId);
    console.log(user);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (user.role !== 'admin') {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'error verifying an admin' });
  }
};

export default isAdmin;
