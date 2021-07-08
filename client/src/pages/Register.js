import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userRegister } from '../action/userAction';
import Back from '../components/Back';
import { useEffect } from 'react';

const Register = ({ history }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState();
  const [isEmployer, setEmployer] = useState(false);

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userRegister);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userRegister(email, password, name, isEmployer, password));
  };

  useEffect(() => {
    if (userInfo) {
      history.push('/login');
    }
  }, [history, userInfo]);

  return (
    <section className='register container pt-4' style={{ backgroundImage: "url('/img/email-pattern.png')" }} >
      <Back/>
      <div className=' form-container'>
        <form className='shadow' onSubmit={handleSubmit}>
          <h2 className='text-center'>Create An Account</h2>
          <div className='py-2'>
            <label className='form-label'>Full Name</label>
            <input
              type='text'
              className='form-control'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='py-2'>
            <label className='form-label'>Phone</label>
            <input
              type='tel'
              className='form-control'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className='py-2'>
            <label className='form-label'>Email</label>
            <input
              type='email'
              className='form-control'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='py-2'>
            <label className='form-label'>Password</label>
            <input
              type='password'
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
    </section>
  );
};

export default Register;
