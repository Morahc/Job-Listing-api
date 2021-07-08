import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postjob } from '../action/jobAction';
import { userJobs } from '../action/userAction';
import ScreenLoader from '../components/ScreenLoader';

const PostJob = ({ history }) => {
  const { userInfo } = useSelector((state) => state.userLogin);

  const dispatch = useDispatch();

  const [step, setStep] = useState(1);
  const [jobName, setJobName] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('Full-time');
  const [category, setCategory] = useState('IT');
  const [deadline, setDeadline] = useState('');
  const [desc, setDesc] = useState({
    description: '',
    requirements: [],
    qualification: [],
  });

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      jobName !== '' &&
      location !== '' &&
      deadline !== '' &&
      desc.description !== '' &&
      desc.requirements !== [] &&
      desc.qualification !== []
    ) {
      dispatch(postjob(jobName, location, jobType, desc, deadline, category));
      // if (success) {
        history.push(`/dash`);
        dispatch(userJobs())
      // }
    }
  };

  useEffect(() => {
    if (Object.keys(userInfo).length !== 0 && !userInfo.isEmployer) {
      history.push('/login');
    }
  }, [userInfo, history]);

  switch (step) {
    case 1:
      return (
        <div className='container postjob'>
          <form className='container w-50 border px-5 py-3'>
            <h2 className='mb-3'>Post Job - Step 1</h2>
            <div className='py-1'>
              <label className='form-label'>Job Name</label>
              <input
                type='text'
                required
                className='form-control'
                value={jobName}
                onChange={(e) => setJobName(e.target.value)}
              />
            </div>
            <div className='py-1'>
              <label className='form-label'>Location</label>
              <input
                type='text'
                required
                className='form-control'
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className='py-1'>
              <label className='form-label'>Job Type</label>
              <select
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                className='form-select'
              >
                <option value='Full-time'>Full-time</option>
                <option value='Part-time'>Part-time</option>
                <option value='Temporal'>Temporal</option>
                <option value='Internship'>Internship</option>
              </select>
            </div>
            <div className='py-1'>
              <label className='form-label'>Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className='form-select'
              >
                <option value='IT'>IT</option>
                <option value='construction'>Construction</option>
                <option value='transportation'>Transportation</option>
                <option value='health-care'>Health-care</option>
                <option value='industry'>Industry</option>
                <option value='food'>Food Servives</option>
                <option value='finance'>Finance</option>
                <option value='others'>Others</option>
              </select>
            </div>
            <div className='py-1'>
              <label className='form-label'>Deadline</label>
              <input
                type='date'
                required
                className='form-control'
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </div>
            <div className=' text-center pt-2'>
              <button className='btn--medium btn--primary' onClick={nextStep}>
                Next
              </button>
            </div>
          </form>
        </div>
      );
    case 2:
      return (
        <>
          {/* {<Message message={message}/>} */}
          <div className='container postjob'>
            <form
              className='container w-75 border px-5 py-3'
              onSubmit={(e) => handleSubmit(e)}
            >
              <h2 className='mb-5'>Post Job - Step 2</h2>
              <div className='form-group'>
                <label>Job Decsription</label>
                <textarea
                  className='form-control my-2'
                  rows='5'
                  value={desc.description}
                  required
                  onChange={(e) =>
                    setDesc({ ...desc, description: e.target.value })
                  }
                ></textarea>
              </div>
              <div className='form-group'>
                <label>Job Qualification</label>
                <textarea
                  className='form-control my-2'
                  rows='3'
                  value={desc.qualification}
                  required
                  placeholder='Separate items with a comma'
                  onChange={(e) =>
                    setDesc({
                      ...desc,
                      qualification: e.target.value.split(','),
                    })
                  }
                ></textarea>
              </div>
              <div className='form-group'>
                <label>Job Requirement</label>
                <textarea
                  className='form-control my-2'
                  rows='3'
                  value={desc.requirements}
                  required
                  placeholder='Separate items with a comma'
                  onChange={(e) =>
                    setDesc({
                      ...desc,
                      requirements: e.target.value.split(','),
                    })
                  }
                ></textarea>
              </div>
              <div className='my-2 d-flex'>
                <button className='btn--medium btn--primary' onClick={prevStep}>
                  Go Back
                </button>
                <div className='me-3'></div>
                <button className='btn--medium btn--primary'>Post Job</button>
              </div>
            </form>
          </div>
        </>
      );
    default:
      return <ScreenLoader />;
  }
};

export default PostJob;
