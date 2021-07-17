import { useState } from 'react';
import Alert from '../components/Alert';
import '../pages/Pages.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [alert, setAlert] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setAlert(true);
    setTimeout(() => {
      if (!alert) {
        setEmail('');
      }
    }, 3000);
  };

  return (
    <>
      {alert && <Alert alert={alert} setAlert={setAlert}></Alert>}
      <section className='footer'>
        <div className='footer-container container py-4 row'>
          <div className='d-flex flex-column justify-content-between col-12 col-md-6'>
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
          <div className='footer-subscription col-12 col-md-6'>
            <p className='footer-subscription-text'>
              Subscribe to our newsletter
            </p>
            <div className='form-container'>
              <form className='d-flex' onSubmit={handleSubmit}>
                <input
                  required
                  type='email'
                  className='form-control px-4'
                  placeholder='youremail@domain.com'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  type='submit'
                  className='button btn--medium btn--secondary'
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;
