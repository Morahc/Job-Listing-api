import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import moment from 'moment';
import { useSelector } from 'react-redux';

const Jobs = () => {
  const [rJobs, setrJobs] = useState([]);
  const { jobs } = useSelector((state) => state.jobList);

  useEffect(() => {
    if (jobs.length !== 0) {
      setrJobs(jobs.filter((job, i) => i < 5));
    } else {
      setrJobs([])
    }
  }, [jobs]);

  return (
    <section className='jobs container pt-4'>
      <div className='row justify-content-center'>
        <div className='col-12 col-md-10'>
          <h3>Recent Jobs</h3>
          <div className='jobs'>
            {rJobs.map((job, i) => (
              <div
                className='job border d-flex align-items-center justify-content-between py-1 px-4'
                key={i}
              >
                <div className='job-desc d-flex flex-column'>
                  <span>{job.jobName}</span>
                  <span>{job.location}</span>
                  <span>{moment(job.createdAt).startOf('day').fromNow()}</span>
                </div>
                <span style={{ backgroundColor: '#6c63ff' }} className='badge'>
                  {job.jobType}
                </span>
                <div className='job-cta'>
                  <Button buttonSize='btn--small' location={`/job/${job._id}`}>
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Jobs;
