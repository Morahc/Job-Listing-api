import Job from '../models/Job.js';

export const postJob = async (req, res) => {
  if (!req.user.isEmployer) {
    res.status(401).json({ msg: 'User not authorized' });
  }

  const { jobName, location, jobType, desc, deadline } = req.body;
  try {
    const job = await Job.create({
      jobName,
      jobType,
      location,
      desc,
      deadline,
      user: req.user._id,
    });

    if (job) {
      res.status(201).json({ msg: 'Job Posted', _id: job._id });
    }
  } catch (error) {
    console.error(error);
    res.status(400);
  }
};

export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (job && req.user.isEmployer) {
      job.remove();
    }
  } catch (error) {
    console.error(error);
    res.status(400);
  }
};

export const applyForJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (req.user.isEmployer) {
      res.status(400).json({ msg: 'user not authorized' });
    }

    const results = job.applicants.map((applicant) => {
      return applicant._id;
    });

    if (!results.includes(req.user._id)) {
      job.applicants.push(req.user._id);
      res.json({ msg: 'applied' }).status(201);
    } else {
      res.status(400).json({ msg: 'user already applied' });
    }

    await job.save();
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};

export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({});
    res.json(jobs).status(201);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};

export const getUserJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ _id: req.user.id });
    res.json(jobs).status(201);
  } catch (error) {
    console.error(error);
    res.status(400);
  }
};

export const getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    res.json(job);
  } catch (error) {
    console.error(error);
    res.status(400);
  }
};

export const updateApplied = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jid);

    if (!job) {
      res.status(400).json({ msg: 'job not found' });
    }

    const applicant = await job.applicants.find((applicant) => {
      return applicant._id == req.params.uid;
    });

    applicant.isAccepted = true;

    const updatedJob = await job.save();

    res.json(updatedJob);
  } catch (error) {
    console.error(error);
    res.status(400);
  }
};
