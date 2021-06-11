import { jobs, employers } from '../data.js';
import User from '../models/User.js';
import generateToken from '../utils/token.js';

export const registerUser = async (req, res) => {
  const { name, email, password, isEmployer, phone } = req.body;
  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({ msg: 'User already exist' });
    } else {
      const user = await User.create({
        name,
        email,
        password,
        isEmployer,
        phone
      });
      if (user) {
        res
          .json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
          })
          .status(201).json({ msg: 'User registered'});
      }
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res
        .json({
          name: user.name,
          isEmployer: user.isEmployer,
          token: generateToken(user.id),
        })
        .status(200);
    } else {
      res.status(404).json({ msg: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(404).json(error);
  }
};

export const userProfile = (req, res) => {
  const { name, email, id } = req.user;
  res.json({ name, email, id }).status(200);
};

export const editProfile = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;

      if (password) {
        user.password = password;
      }

      const updatedUser = await user.save();

      res
        .json({
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
        })
        .status(201);
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};
