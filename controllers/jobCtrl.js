import Job from '../models/Job.js';
import User from '../models/User.js';
import _ from 'lodash';

export const postJob = async (req, res) => {
  if (!req.user.isEmployer) {
    res.status(401).json({ msg: 'User not authorized' });
  }

  const { jobName, location, jobType, desc, deadline, category } = req.body;
  try {
    const job = await Job.create({
      jobName,
      jobType,
      location,
      desc,
      deadline,
      category,
      user: req.user._id,
    });

    if (job) {
      res.status(200).json({ msg: 'Job Posted', _id: job._id });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};

export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (job && req.user.isEmployer) {
      job.remove();
      res.json({ msg: 'Job deleted' });
    } else {
      res.json({ msg: 'Job not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};

export const applyForJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    const user = await User.findById(req.user._id);

    if (req.user.isEmployer) {
      res.status(400).json({ msg: 'User is employer, Not authorized' });
    }

    const results = job.applicants.map((applicant) => {
      return applicant.user;
    });

    if (!results.includes(req.user._id)) {
      job.applicants.push({ user: req.user._id });
      user.pendingJobs.push(job);
      res.json({ msg: 'Applied For Job' }).status(201);
    } else {
      res.status(400).json({ msg: 'user already applied' });
    }

    await job.save();
    await user.save();
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};

export const getAllJobs = async (req, res) => {
  const keyword = req.query
    ? {
        jobName: {
          $regex: req.query.keyword ? req.query.keyword : '',
          $options: 'i',
        },
        location: {
          $regex: req.query.location ? req.query.location : '',
          $options: 'i',
        },
        category: {
          $regex: req.query.category ? req.query.category : '',
          $options: 'i',
        },
      }
    : {};
  try {
    const jobs = await Job.find(keyword).select(
      'jobName jobType desc category location createdAt'
    ).sort({ createdAt:'desc'});
    res.json(jobs).status(200);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};

export const getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .select('jobName jobType desc category location deadline user createdAt')
      .populate({
        path: 'user',
        model: 'User',
        select: 'name email',
      });
    res.json(job);
  } catch (error) {
    console.error(error);
    res.status(400);
  }
};

export const getUserJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ user: { _id: req.user._id } })
      .select('jobName location jobType applicants createdAt')
      .populate({
        path: 'applicants.user',
        model: 'User',
        select: 'name email',
      });
    res.json(jobs).status(200);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};

export const bookmarkJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    const user = await User.findById(req.user._id);

    if (
      user.bookmarks.map((user) => user.toString()).includes(job._id.toString())
    ) {
      res.json({ msg: 'Job already bookmarked' }).status(400);
    } else {
      user.bookmarks.push(job);
      user.save();
      res.status(201).json({ msg: 'Job added to bookmark' });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};

export const removeBookmark = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: 'bookmarks',
      model: 'Job',
      select: 'jobName jobType  category location createdAt _id',
    });

    const bookmark = user.bookmarks.find((bookmark) => {
      return bookmark._id.toString() === req.params.id;
    });

    const index = user.bookmarks.indexOf(bookmark);
    if (index > -1) {
      user.bookmarks.splice(index, 1);
    }

    const updatedUser = await user.save();
    res.status(201).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};
