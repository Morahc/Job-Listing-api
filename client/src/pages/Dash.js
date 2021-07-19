import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Accordion, ListGroup } from 'react-bootstrap';
import moment from 'moment';
import {
  userProfile,
  updateUser,
  logout,
  userJobs,
  acceptUser,
} from '../action/userAction';
import Button from '../components/Button';
import Nav from '../components/Nav';
import ScreenLoader from '../components/ScreenLoader';
import { deletejob, removeBookmark } from '../action/jobAction';

const Dash = ({ history }) => {
  const [click, setClick] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { success: deleteSuccess } = useSelector((state) => state.jobDelete);
  const { success: bookmarkSuccess } = useSelector(
    (state) => state.removeBookmark
  );
  const { success: postSuccess } = useSelector((state) => state.postJob);
  const { jobs } = useSelector((state) => state.userJob);
  const { succcess: acceptSuccess } = useSelector((state) => state.userAccept);
  const { user, loading: profileLoading } = useSelector(
    (state) => state.userProfile
  );

  const handleJobDelete = (id) => {
    dispatch(deletejob(id));
  };

  const handleBookmarkDelete = (id) => {
    dispatch(removeBookmark(id));
  };

  const logoutHandler = () => {
    dispatch(logout());
    history.push('/login');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (confirmPassword !== password) {
      console.log("Passwords don't match");
    } else {
      dispatch(updateUser({ name, email, password, phone }));
    }
  };

  const handleAccept = (id) => {
    if (userInfo && userInfo.isEmployer && jobs) {
      dispatch(acceptUser(id));
      if (acceptSuccess) {
        dispatch(userJobs());
      }
    }
  };

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user.name) {
        dispatch(userProfile());
      } else {
        setName(user.name);
        setEmail(user.email);
        setPhone(user.phone);
      }
    }
    if (userInfo.isEmployer) {
      dispatch(userJobs());
    }
    if (bookmarkSuccess) {
      setSuccess(true);
    }
  }, [
    dispatch,
    user,
    userInfo,
    history,
    success,
    postSuccess,
    deleteSuccess,
    bookmarkSuccess,
  ]);

  const showNav = () => {
    if (window.innerWidth <= 990) {
      setClick(true);
    } else {
      setClick(false);
    }
  };

  useEffect(() => {
    showNav();
  }, []);

  window.addEventListener('resize', showNav);

  return (
    <>
      {profileLoading ? (
        <ScreenLoader />
      ) : (
        <section className='dashboard row'>
          <Nav />
          <Tabs
            className='mt-5 row col-lg-9 col-11 justify-content-center dash border'
            selectedTabClassName='react-tabs__tab--selected'
          >
            <span
              className='col-1 material-icons-round sidebar-menu'
              onClick={() => setClick(!click)}
            >
              menu
            </span>

            <div
              className={click ? 'col-md-3 sidenav' : 'col-md-3 sidenav active'}
            >
              <div className='sidenav-header row justify-content-center align-items-center'>
                <div className='col-10'>
                  <h5>Hi {user.name}</h5>
                  <small>Welcome Back</small>
                </div>
              </div>
              <TabList className='sidenav-nav'>
                <Tab onClick={() => setClick(!click)}>
                  {!userInfo.isEmployer ? 'Dashboard' : 'Jobs'}
                </Tab>
                <Tab onClick={() => setClick(!click)}>Bookmarks</Tab>
                <Tab onClick={() => setClick(!click)}>Profile</Tab>
              </TabList>
              <button
                className='button btn--medium btn--primary logout'
                onClick={logoutHandler}
              >
                Logout
              </button>
            </div>
            <div className='col-lg-9 col-12 border tab-container scroll--simple'>
              <div className='tab-content'>
                {!userInfo.isEmployer ? (
                  <TabPanel className='tab'>
                    <div className='d-flex justify-content-between align-items-center'>
                      <h5>Pending Jobs - {user.pendingJobs.length}</h5>
                    </div>
                    <div>
                      {user.pendingJobs.length !== 0 ? (
                        user.pendingJobs.map((job) => (
                          <div className='d-block'>
                            <div
                              className='job border d-flex align-items-center justify-content-between py-1 px-4 mt-4'
                              key={job._id}
                            >
                              <div className='job-desc d-flex flex-column'>
                                <span>{job.jobName}</span>
                                <span>{job.location}</span>
                                <span>
                                  {moment(job.createdAt)
                                    .startOf('day')
                                    .fromNow()}
                                </span>
                              </div>
                              <div className='bagdes text-center'>
                                <span
                                  style={{ backgroundColor: '#6c63ff' }}
                                  className='badge d-block'
                                >
                                  {job.jobType}
                                </span>
                                {job.applicants[0].isAccepted ? (
                                  <span className='badge me-2 bg-success'>
                                    Accepted
                                  </span>
                                ) : (
                                  <span className='badge me-2 bg-warning'>
                                    Pending
                                  </span>
                                )}
                              </div>

                              <div className='job-cta'>
                                <Button
                                  buttonSize='btn--small'
                                  location={`job/${job._id}`}
                                >
                                  View
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <h6>No Pending Jobs To Display</h6>
                      )}
                    </div>
                  </TabPanel>
                ) : (
                  <TabPanel className='tab'>
                    <div className='d-flex justify-content-between align-items-center'>
                      <h5>Jobs - {jobs.length}</h5>
                      <Button
                        buttonSize='btn--small'
                        buttonStyle='btn--secondary'
                        location={`/postjob`}
                      >
                        Post job
                      </Button>
                    </div>
                    <Accordion>
                      {jobs.length !== 0 ? (
                        jobs.map((job) => (
                          <div className='d-block'>
                            <div
                              className='job border py-1 px-4 mt-4 position-relative'
                              key={job._id}
                            >
                              <div className='job-desc d-flex flex-column'>
                                <span>{job.jobName}</span>
                                <span>{job.location}</span>
                                <span>
                                  {moment(job.createdAt)
                                    .startOf('day')
                                    .fromNow()}
                                </span>
                              </div>
                              <span className='badge bg-secondary'>
                                {job.jobType}
                              </span>
                              <div className='job-cta'>
                                <Button
                                  buttonSize='btn--small'
                                  location={`job/${job._id}`}
                                >
                                  View
                                </Button>
                                <Accordion.Toggle as='div' eventKey={job._id}>
                                  <span className='material-icons-round'>
                                    expand_more
                                  </span>
                                </Accordion.Toggle>
                                <span
                                  style={{ color: 'rgb(216, 72, 72)' }}
                                  className='material-icons-round position-absolute top-0 start-100 translate-middle'
                                  onClick={() => handleJobDelete(job._id)}
                                >
                                  cancel
                                </span>
                              </div>
                            </div>
                            <Accordion.Collapse eventKey={job._id}>
                              {job.applicants.length !== 0 ? (
                                <ListGroup>
                                  {job.applicants.map((applicant) => (
                                    <ListGroup.Item key={applicant._id}>
                                      <div className='d-flex justify-content-between align-items-center'>
                                        <div>{applicant.user.name}</div>

                                        {applicant.isAccepted ? (
                                          <span className='badge bg-success'>
                                            accepted
                                          </span>
                                        ) : (
                                          <span className='badge bg-warning'>
                                            pending
                                          </span>
                                        )}

                                        <button
                                          className='button btn--primary btn--small'
                                          onClick={() =>
                                            handleAccept(applicant._id)
                                          }
                                        >
                                          Accept
                                        </button>
                                      </div>
                                    </ListGroup.Item>
                                  ))}
                                </ListGroup>
                              ) : (
                                <div className='border px-3 py-2 text-center'>
                                  No Applicants
                                </div>
                              )}
                            </Accordion.Collapse>
                          </div>
                        ))
                      ) : (
                        <h6>No Posted Jobs To Display</h6>
                      )}
                    </Accordion>
                  </TabPanel>
                )}
                <TabPanel className='tab'>
                  <h5>Bookmarks - {user.bookmarks.length}</h5>
                  {user.bookmarks.length !== 0 ? (
                    user.bookmarks.map((job) => (
                      <div
                        className='job border d-flex align-items-center justify-content-between py-1 px-4 mt-4 position-relative'
                        key={job._id}
                      >
                        <div className='job-desc d-flex flex-column'>
                          <span>{job.jobName}</span>
                          <span>{job.location}</span>
                          <span>
                            {moment(job.createdAt).startOf('day').fromNow()}
                          </span>
                        </div>
                        <span
                          style={{ backgroundColor: '#6c63ff' }}
                          className='badge'
                        >
                          {job.jobType}
                        </span>
                        <div className='job-cta'>
                          <Button
                            buttonSize='btn--small'
                            location={`job/${job._id}`}
                          >
                            View
                          </Button>
                          <span
                            style={{ color: 'rgb(216, 72, 72)' }}
                            className='material-icons-round position-absolute top-0 start-100 translate-middle'
                            onClick={() => handleBookmarkDelete(job._id)}
                          >
                            cancel
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <h6>No Bookmarks To Display</h6>
                  )}
                </TabPanel>
                <TabPanel className='tab'>
                  <h5>Profile</h5>
                  <div className=' profile'>
                    <form className='container w-75' onSubmit={handleSubmit}>
                      <div className='py-1'>
                        <label className='form-label'>Full Name</label>
                        <input
                          type='text'
                          className='form-control'
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className='py-1'>
                        <label className='form-label'>Email</label>
                        <input
                          type='email'
                          className='form-control'
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className='py-1'>
                        <label className='form-label'>Phone</label>
                        <input
                          type='tel'
                          className='form-control'
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                      <div className='py-1 row'>
                        <div className='col'>
                          <label className='form-label'>New Password</label>
                          <input
                            type='password'
                            className='form-control'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                        <div className='col'>
                          <label className='form-label'>Confirm Password</label>
                          <input
                            type='password'
                            className='form-control'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className=' text-center pt-2'>
                        <button
                          className='btn--medium btn--primary'
                          type='submit'
                        >
                          Update
                        </button>
                      </div>
                    </form>
                  </div>
                </TabPanel>
              </div>
            </div>
          </Tabs>
        </section>
      )}
    </>
  );
};

export default Dash;
