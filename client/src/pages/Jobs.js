import { useState } from 'react';
import Back from '../components/Back';
import Button from '../components/Button';
import ScreenLoader from '../components/ScreenLoader';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { listJobs } from '../action/jobAction';


const Jobs = () => {
  const dispatch = useDispatch();
  const { jobs,loading } = useSelector((state) => state.jobList);
  
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(listJobs(keyword, location, category));
  };

  return (
    <section className='all_jobs'  style={{ backgroundImage: "url('/img/email-pattern.png')" }} >
      {loading && <ScreenLoader />}
      <div className='jobs-container container py-4'>
        <Back location='/'/>
        <div className='pt-4 row justify-content-between'>
          <div className='col-md-4 col-12 position-sticky'>
            <div className=' form-container'>
              <h4>Filter Jobs</h4>
              <form className='shadow' onSubmit={handleSubmit}>
                <div className='py-2'>
                  <label className='form-label'>By Name</label>
                  <input
                    type='text'
                    className='form-control'
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                </div>
                <div className='py-2'>
                  <label className='form-label'>By Location</label>
                  <input
                    type='text'
                    className='form-control'
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <div className='py-2'>
                  <label className='form-label'>By Category</label>
                  <input
                    type='text'
                    className='form-control'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>
                <div className='text-center py-2'>
                  <button
                    className='button btn--primary btn--medium'
                    type='submit'
                  >
                    Filter
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className='col-md-8 col-12'>
            <h3>Jobs</h3>
            {jobs.length > 0 ?
              <div className='jobs'>
                {jobs.map((job, i) => (
                  <div
                    className='job border d-flex align-items-center justify-content-between py-1 px-4'
                    key={i}
                  >
                    <div className='job-desc d-flex flex-column'>
                      <span>{job.jobName}</span>
                      <span>{job.location}</span>
                      <span>
                        {moment(job.createdAt).startOf('day').fromNow()}
                      </span>
                    </div>
                    <span style={{ backgroundColor: '#6c63ff'}} className="badge">{job.jobType}</span>
                    <div className='job-cta'>
                      <Button
                        buttonSize='btn--small'
                        location={`/job/${job._id}`}
                      >
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            : <p className='lead'>No Jobs to display</p>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Jobs;
