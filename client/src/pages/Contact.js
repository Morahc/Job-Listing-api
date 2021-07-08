import React from 'react';
import Button from '../components/Button';

const Contact = () => {
  return (
    <section id='contact' className='contact container py-5'>
      <h2 className='text-center mb-4'>Get In Touch</h2>
      <div className='row justify-content-center align-items-center'>
        <div className='col-12 row justify-content-center'>
          <div className='col-12 col-md-4 border py-4 px-5 contact-info black'>
            <h2>Contact Info</h2>
            <p>Address : New York - 2398 10 Hadson Carl Street</p>
            <p>Telephone : +1 232 305 3930</p>
            <p>Email : info@yourdomain.com</p>
          </div>
          <div className='form-container white col-sm-12 col-md-6'>
            <form className=' py-4 px-5'>
              <h4>Contact Us</h4>
              <div className='pt-3'>
                <label htmlFor='exampleInputEmail1' className='form-label'>
                  Email
                </label>
                <input type='email' className='form-control' />
              </div>
              <div className='py-3'>
                <label htmlFor='textarea' className='form-label'>
                  Message
                </label>
                <textarea type='text-area' className='form-control' rows='3' />
              </div>
              <div>
                <Button buttonSize='btn--medium' buttonStyle='btn--primary' location='/mail/send'>
                  SEND
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
