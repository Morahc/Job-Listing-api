import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Back from '../components/Back';
import Message from '../components/Message';
import { userLogin } from '../action/userAction';

const Login = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const { userInfo, error } = useSelector((state) => state.userLogin);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userLogin(email, password));
  };

  useEffect(() => {
    if (Object.keys(userInfo).length !== 0 && userInfo.constructor === Object) {
      history.push('/dash');
    }
  }, [userInfo, history, error]);

  return (
    <section
      className='login '
      style={{ backgroundImage: "url('/img/email-pattern.png')" }}
    >
      <div className='container pt-4'>
        {error && <Message message={error} />}
        <Back />
        <div className='form-container'>
          <form className='shadow' onSubmit={handleSubmit}>
            <h2 className='text-center'>Login</h2>
            <div className='py-3'>
              <label className='form-label'>Email</label>
              <input
                type='email'
                className='form-control'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='py-3'>
              <label className='form-label'>Password</label>
              <input
                type='password'
                className='form-control'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className=' text-center py-2'>
              <button className='button btn--medium btn--primary' type='submit'>
                Login
              </button>
            </div>
            <p className='form-text text-center'>
              Don't have an account?
              <Link to='/register'>Sign Up</Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
