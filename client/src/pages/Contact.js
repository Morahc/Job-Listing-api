import React, { useState } from 'react';
import Alert from '../components/Alert';

const Contact = () => {
  const [alert, setAlert] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setAlert(true);
    setTimeout(() => {
      if (!alert) {
        setEmail('');
        setMessage('');
      }
    }, 3000);
  };

  return (
    <>
      {alert && (
        <Alert
          alert={alert}
          setAlert={setAlert}
          message={`${email} Your email has been sent`}
        ></Alert>
      )}
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
              <form className=' py-4 px-5' onSubmit={handleSubmit}>
                <h4>Contact Us</h4>
                <div className='pt-3'>
                  <label className='form-label'>Email</label>
                  <input
                    required
                    type='email'
                    className='form-control'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className='py-3'>
                  <label className='form-label'>Message</label>
                  <textarea
                    required
                    type='text-area'
                    className='form-control'
                    rows='3'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
                <div>
                  <button
                    type='submit'
                    className='button btn--medium btn--primary'
                  >
                    SEND
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
