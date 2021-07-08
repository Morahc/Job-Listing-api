import React from 'react';

const Job = () => {
  return (
    <div className='r-job border d-flex align-items-center justify-content-between py-1 px-4 mt-4'>
      <div className='r-job-desc d-flex flex-column'>
        <span>jobName</span>
        <span>location</span>
        <span>createdAt</span>
      </div>
      <div className='r-job-cta'>
        <Button buttonSize='btn--small'>View</Button>
      </div>
    </div>
  );
};

export default Job;
