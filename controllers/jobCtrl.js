import Job from '../models/Job.js';

export const postJob = async (req, res) => {
  if(!req.user.isEmployer){
    res.status(401).json({ msg: 'User not authorized'})
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
      res.status(201).json({ msg: 'Job Posted' ,_id: job._id});
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

    job.applicants.push(req.user._id)

    job.save()

    res.json({ msg: 'Applied'}).status(201)

  } catch (error) {
    console.error(error)
    res.status(400)
  }
};
