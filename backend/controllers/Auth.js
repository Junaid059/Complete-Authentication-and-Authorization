import User from '../models/User.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existedUser = await User.findOne({ email });

    if (existedUser) {
      return res
        .status(401)
        .json({ success: false, message: 'user already exits' });
    }

    const hashPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashPassword,
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (Error) {
    res.status(500).json({ success: false, message: 'server error' });
    console.log('Error ', Error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: 'user not found' });
    }

    if (user) {
      const isMatch = await bcryptjs.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(401)
          .json({ success: false, message: 'password not match' });
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      res.cookie('token', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        secure: false,
      });
      res.status(201).json('login successful', user, token);
    }
  } catch (Error) {
    res.status(500).json({ success: false, message: 'server error' });
    console.log('Error', Error);
  }
};

const Logout = async (req, res) => {
  try {
    res.clearCookie('token');
    res.status(200).json({ success: true, message: 'logout successful' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'server error' });
    console.log('Error', Error);
  }
};

export { register, login, Logout };
