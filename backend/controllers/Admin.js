import User from '../models/User.js';

const getUser = async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching user' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const Id = req.params;
    const checkAdmin = await User.findByIdAndDelete(Id);
    if (checkAdmin.role == 'admin') {
      res.status().json('You cannot delete an Admin');
    }
    const user = await User.findByIdAndDelete(Id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(201).json('user deleted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting user' });
  }
};
export { getUser, deleteUser };
