import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from './Button';

const Back = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  return (
    <div className='back-bar'>
      <Link to='/'>
        <button className='button btn--primary btn--small back'>
          <i className='material-icons-sharp me-1'>arrow_back</i>
          <span className='material-icons-round'>home</span>
        </button>
      </Link>

      <div className='dash-btn'>
        {Object.keys(userInfo).length ? (
          <Link to='/dash'>
            <span className='material-icons-outlined'>account_circle</span>
          </Link>
        ) : (
          <Button location='login'>Sign In</Button>
        )}
      </div>
    </div>
  );
};

export default Back;
