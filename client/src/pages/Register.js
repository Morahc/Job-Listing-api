import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userRegister } from '../action/userAction';
import Back from '../components/Back';
import { useEffect } from 'react';
import Message from '../components/Message';

const Register = ({ history }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isEmployer, setEmployer] = useState(false);

  const dispatch = useDispatch();
  const { userInfo, error } = useSelector((state) => state.userRegister);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userRegister(name, email, password, isEmployer, phone));
  };

  useEffect(() => {
    if (userInfo) {
      history.push('/login');
    }
  }, [history, userInfo]);

  return (
    <section
      className='register'
      style={{ backgroundImage: "url('/img/email-pattern.png')" }}
    >
      <div className='container pt-4'>
        {error && <Message message={error} />}
        <Back />
        <div className=' form-container'>
          <form className='shadow' onSubmit={handleSubmit}>
            <h2 className='text-center'>Create An Account</h2>
            <div className='py-2'>
              <label className='form-label'>Full Name</label>
              <input
                type='text'
                required
                className='form-control'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='py-2'>
              <label className='form-label'>Phone</label>
              <input
                type='tel'
                pattern='[0-9]{11}'
                required
                className='form-control'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className='py-2'>
              <label className='form-label'>Email</label>
              <input
                type='email'
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                required
                className='form-control'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='py-2'>
              <label className='form-label'>Password</label>
              <input
                type='password'
                pattern="[a-z0-9._%+-]{8,20}"
                required
                className='form-control'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className='form-check py-3'>
              <label className='label'>
                <div className='toggle'>
                  <input
                    className='toggle-state'
                    type='checkbox'
                    checked={isEmployer}
                    onChange={(e) => setEmployer(e.target.checked)}
                  />
                  <div className='toggle-inner'>
                    <div className='indicator'></div>
                  </div>
                  <div className='active-bg'></div>
                </div>
                <div className='label-text'>Join as Employer</div>
              </label>

              {/* <input
              className='form-check-input'
              type='checkbox'
              checked={isEmployer}
              onChange={(e) => setEmployer(e.target.checked)}
            />
            <label className='form-check-label'>Register as employer</label> */}
            </div>
            <div className=' text-center py-2'>
              <button className='button btn--medium btn--secondary'>
                Register
              </button>
            </div>
            <p className='form-text text-center'>
              Already have an account? <Link to='/login'>Sign In</Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
