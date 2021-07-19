import { useDispatch } from 'react-redux';
import { listJobs } from '../action/jobAction';

const Categories = ({ history }) => {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    const name = '';
    const location = '';
    const category = e.target.dataset.category;
    dispatch(listJobs(name,location,category))
    history.push('/job')
  };
  return (
    <section className='category container'>
      <div className='category-text mb-5'>
        <h2 className='text-center'>Popular Categories</h2>
        <p className='text-center'>
          Lorem ipsum dolor sit amet consectetur is a nice adipisicing elita
          ssumenda a similique perferendis dolorem eos.
        </p>
      </div>
      <div className='row align-items-center category-container'>
        <div className='col-6 col-lg-3 col-md-4 col-sm-4 col-xs-6' onClick={(e) => handleClick(e)}>
          <div className='border white' data-category='food'>
            <i data-category='food' className='material-icons-outlined'>
              restaurant
            </i>
            <p data-category='food'>Food</p>
          </div>
        </div>
        <div className='col-6 col-lg-3 col-md-4 col-sm-4 col-xs-6' onClick={(e) => handleClick(e)}>
          <div className='border white' data-category='construction'>
            <i data-category='construction' className='material-icons-outlined'>
              construction
            </i>
            <p data-category='construction'>Construction</p>
          </div>
        </div>
        <div className='col-6 col-lg-3 col-md-4 col-sm-4 col-xs-6' onClick={(e) => handleClick(e)}>
          <div className='border white' data-category='industry'>
            <i data-category='industry' className='material-icons-outlined'>
              precision_manufacturing
            </i>
            <p data-category='industry'>Industry</p>
          </div>
        </div>
        <div className='col-6 col-lg-3 col-md-4 col-sm-4 col-xs-6' onClick={(e) => handleClick(e)}>
          <div className='border white' data-category='transportation'>
            <i data-category='transportation' className='material-icons-sharp'>
              local_shipping
            </i>
            <p data-category='transportation'>Transportation</p>
          </div>
        </div>
        <div className='col-6 col-lg-3 col-md-4 col-sm-4 col-xs-6' onClick={(e) => handleClick(e)}>
          <div className='border white' data-category='health-care'>
            <i data-category='health-care' className='material-icons-sharp'>
              local_hospital
            </i>
            <p data-category='health-care'>Health Care</p>
          </div>
        </div>
        <div className='col-6 col-lg-3 col-md-4 col-sm-4 col-xs-6' onClick={(e) => handleClick(e)}>
          <div className='border white' data-category='finance'>
            <i data-category='finance' className='material-icons-outlined'>
              account_balance
            </i>
            <p data-category='finance'>Finance</p>
          </div>
        </div>
        <div className='col-6 col-lg-3 col-md-4 col-sm-4 col-xs-6' onClick={(e) => handleClick(e)}>
          <div className='border white' data-category='it'>
            <i data-category='IT' className='material-icons-sharp'>
              computer
            </i>
            <p data-category='IT'>IT</p>
          </div>
        </div>
        <div className='col-6 col-lg-3 col-md-4 col-sm-4 col-xs-6' onClick={(e) => handleClick(e)}>
          <div className='border white' data-category='others'>
            <i data-category='others' className='material-icons-sharp'>
              work
            </i>
            <p data-category='others'>Others</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
