import User from '../models/User.js';
import Job from '../models/Job.js';
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
        phone,
      });
      if (user) {
        res
          .json({
            _id: user._id,
            name: user.name,
          })
          .status(201)
          .json({ msg: 'User registered' });
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
          _id: user._id,
          isEmployer: user.isEmployer,
          token: generateToken(user._id),
        })
        .status(200);
    } else {
      res.status(404).json({ msg: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};

export const userProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate({
        path: 'bookmarks',
        select: 'jobName location jobType createdAt',
      })
      .populate({
        path: 'pendingJobs',
        select: 'jobName location jobType createdAt applicants',
        populate: {
          path: 'applicants.user',
          model: 'User',
          select: 'name _id',
        },
      });

    const newObj = [...user.pendingJobs.toObject(), user.pendingJobs.map((jobs) => {
      jobs.applicants = (jobs.applicants.filter(a => a.user._id.toString() == req.user._id))
    })]

    const updatedUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      isEmployer: user.isEmployer,
      phone: user.phone,
      bookmarks: user.bookmarks,
      pendingJobs: newObj.slice(0, newObj.length - 1)
    }

    if (user) {
      res.json(updatedUser).status(200);
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};

export const editProfile = async (req, res) => {
  const { name, email, password, phone } = req.body;
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;
      user.phone = phone || user.phone;

      if (password) {
        user.password = password;
      }

      const updatedUser = await user.save();

      res
        .json({
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          phone: updatedUser.phone,
        })
        .status(201);
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};

export const updateApplied = async (req, res) => {
  try {
    if (!req.user.isEmployer) {
      res.status(400).json({ msg: 'User not authorized' });
    }

    const job = await Job.find({
      applicants: { $elemMatch: { _id: req.params.id } },
      user: { _id: req.user._id },
    }).select('applicants');

    if (!job) {
      res.status(400).json({ msg: 'job not found' });
    }

    const applicant = job[0].applicants.find((applicant) => {
      return applicant._id == req.params.id;
    });

    applicant.isAccepted = !applicant.isAccepted;

    const updatedJob = await job[0].save();

    res.json({ msg: 'User Accepted' });
  } catch (error) {
    console.error(error);
    res.status(400);
  }
};
