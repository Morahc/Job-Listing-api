import { jobDetails, bookmarkJob, applyJob } from '../action/jobAction';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
// import Back from '../components/Back';
import Message from '../components/Message';
import ScreenLoader from '../components/ScreenLoader';
import moment from 'moment';
import './Pages.css';

const JobDetails = ({ match, history }) => {
  const dispatch = useDispatch();
  const {
    job: {
      _id,
      jobName,
      jobType,
      location,
      category,
      desc: { description, qualification, requirements },
      createdAt,
      user: { name, email },
    },
    loading,
  } = useSelector((state) => state.jobDetails);
  const { userInfo } = useSelector((state) => state.userLogin);
  const {
    success: applySuccess,
    error: applyError,
    data: applyData,
  } = useSelector((state) => state.jobApply);
  const {
    success: bookmarkSuccess,
    data: bookmarkData,
    error: bookmarkError,
  } = useSelector((state) => state.jobBookmark);


  const handleBookmark = (id) => {
    if (userInfo) {
      dispatch(bookmarkJob(id));
    } else {
      history.push('/login');
    }
  };

  const handleApply = (id) => {
    if (userInfo) {
      dispatch(applyJob(id));
    } else {
      history.push('/login');
    }
  };

  useEffect(() => {
    dispatch(jobDetails(match.params.id));
  }, [dispatch, match]);

  return (
    <>
      {loading && <ScreenLoader />}
      {bookmarkSuccess ? (
        <Message message={bookmarkData.msg} />
      ) : (
        <Message message={bookmarkError} />
      )}
      {!applySuccess ? (
        <Message message={applyError} />
      ) : (
        <Message message={applyData.msg} />
      )}
      <section className='job-detail'  style={{ backgroundImage: "url('/img/email-pattern.png')" }}>
        {/* <Back /> */}
        <div className='jumbotron p-5 position-sticky top-0'>
          <div className='jumbo-text text-center'>
            <h2>{jobName}</h2>
            <p style={{ fontVariant:'small-caps'}}>
              <Link to='/job'>Jobs</Link> &gt; {category}
            </p>
          </div>
        </div>
        <div className='my-5 container'>
          <div className='row justify-content-between'>
            <div className='col-md-8 col-12 shadow white'>
              <div className='container py-4'>
                <h3>Job Description</h3>
                <div className='desc px-4 py-3'>
                  <p>{description}</p>
                </div>
                <h4>Qualification</h4>
                <div className='qual px-3 py-2'>
                  <ul>
                    {qualification.map((item, i) => (
                      <li key={i}>{item.trim()}</li>
                    ))}
                  </ul>
                </div>
                <h4>Requirements</h4>
                <div className='req px-3 py-2'>
                  <ul>
                    {requirements.map((item, i) => (
                      <li key={i}>{item.trim()}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className='col-md-3 row h-25 align-items-center justify-content-center'>
              <div className='col-12 shadow py-4 px-3 white'>
                <div className='job-info col-12'>
                  <h4>Job Information</h4>
                  <div className='px-4 py-2'>
                    <p>{jobName}</p>
                    <p>{location}</p>
                    <p>{jobType}</p>
                    <p>{moment(createdAt).startOf('day').fromNow()}</p>
                  </div>
                </div>
                <div className='col-12 row apply ms-1'>
                  <button
                    className='button btn--primary btn--medium col-7'
                    onClick={() => handleApply(_id)}
                  >
                    Apply
                  </button>
                  <span
                    className='material-icons-outlined col-3'
                    onClick={() => handleBookmark(_id)}
                  >
                    bookmark_border
                  </span>
                </div>
              </div>
              <div className='col-12 shadow mt-5 py-4 px-3 white'>
                <div className='job-info col-12'>
                  <h4>Employer Information</h4>
                  <div className='px-4 py-2'>
                    <p>{name}</p>
                    <p>{email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default JobDetails;
