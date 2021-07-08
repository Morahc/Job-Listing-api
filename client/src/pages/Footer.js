import React from 'react';
import Button from '../components/Button';
import '../pages/Pages.css';

const Footer = () => {
  return (
    <section className='footer'>
      <div className='footer-container container py-4 row'>
        <div className='d-flex flex-column justify-content-between col-6'>
          <div className='footer-logo'>
            <div className='social-logo'>JobFinder</div>
          </div>
          <div className='social-icons'>
            <span className='me-3'>Facebook</span>
            <span className='me-3'>Twitter</span>
            <span className='me-3'>LinkedIn</span>
          </div>
          <small className='website-rights'>JobFinder © 2021</small>
        </div>
        <div className='footer-subscription col-6'>
          <p className='footer-subscription-text'>
            Subscribe to our newsletter
          </p>
          <div className='form-container'>
            <form className='d-flex'>
              <input
                type='email'
                className='form-control px-4'
                placeholder='youremail@domain.com'
              />
              <Button
                location='/subscribe'
                buttonSize='btn--medium'
                buttonStyle='btn--secondary'
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
