import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import './Navbar.css';

const Nav = () => {
  const [click, setClick] = useState(false);

  const handleClick = () => {
    setClick(!click);
  };

  // const [offset, setOffset] = useState(0);

  // useEffect(() => {
  //   window.onscroll = () => {
  //     setOffset(window.pageYOffset);
  //   };
  // }, []);

  return (
    <>
      <header
      // style={
      //   offset >= 90
      //     ? {
      //         backgroundImage: `url(/img/email-pattern.png)`,
      //         position: 'sticky',
      //         top: 0,
      //         boxShadow: '0 .5rem 1rem rgba(90, 83, 83, 0.15)',
      //       }
      //     : {}
      // }
      >
        <div className='navbar container col-12'>
          <Link to='/' className='navbar-brand p-0'>
            JobFinder
          </Link>
          <div className='menu-icon d-md-none' onClick={handleClick}>
            {click ? (
              <i className='material-icons'>close</i>
            ) : (
              <i className='material-icons'>menu</i>
            )}
          </div>
          <nav>
            <ul className={click ? 'nav active' : 'nav'}>
              <li className='nav-item'>
                <a href='#about' className='nav-link'>
                  About
                </a>
              </li>
              <li className='nav-item'>
                <a href='#contact' className='nav-link'>
                  Contact
                </a>
              </li>
              <li className='nav-item me-3'>
                <Button
                  buttonStyle='btn--secondary'
                  buttonSize='btn--small'
                  location='/job'
                >
                  Jobs
                </Button>
              </li>
              <li className='nav-item ml-2'>
                <Button
                  buttonStyle='btn--primary'
                  buttonSize='btn--small'
                  location='/register'
                >
                  Sign Up
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Nav;
