import React from 'react';
import { Route } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { listJobs } from '../action/jobAction';
import Button from '../components/Button';
import './Pages.css';

const Hero = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e, history) => {
    e.preventDefault();
    dispatch(listJobs(name, location, category));
    history.push('/job');
  };

  return (
    <section className='container pt-5 hero'>
      <div className='hero-area'>
        <div className='home-section'>
          <div className='hero-desc w-50'>
            <div className='hero-header'>
              <h4 className='display-6'>Looking for a job</h4>
              <h4 className='display-6'>or looking to hire?</h4>
            </div>
            <div className='hero-text py-4'>
              We Build Lasting Relationships Between Candidates & Businesses The
              automated process starts as soon as your clothes go into the
              machine. The outcome is gleaming clothes. Placeholder text
              commonly used. The automated process starts as soon as your
              clothes go into the machine.
            </div>
            <div>
              <Button buttonSize='btn--medium' buttonStyle='btn--secondary' location='/login'>
                Post a Job
              </Button>
            </div>
          </div>
          <div className=' form-container shadow white'>
            <form className=' py-4 px-5'>
              <h5 className='text-center'>Find a job</h5>
              <div className='py-3'>
                <label className='form-label'>Job name or keyword</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type='text'
                  className='form-control'
                />
              </div>
              <div className='py-3'>
                <label className='form-label'>Location</label>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  type='text'
                  className='form-control'
                />
              </div>
              <div className='py-3'>
                <label className='form-label'>Category</label>
                <input
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  type='text'
                  className='form-control'
                />
              </div>
              <div className=' text-center'>
                <Route
                  render={({ history }) => (
                    <button
                      type='submit'
                      className=' button btn--medium btn--primary'
                      onClick={(e) => handleSubmit(e,history)}
                    >
                      Search
                    </button>
                  )}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
