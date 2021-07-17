import { Modal } from 'react-bootstrap';

const Alert = ({ alert, setAlert, message }) => {
  const handleClose = () => setAlert(false);

  return (
    <>
      <Modal centered show={alert} onHide={handleClose}>
        <Modal.Body>
          <div className='d-flex align-items-center justify-content-center flex-column'>
            <h3 className='py-2'>Thanks for the feedback</h3>
            { message && <p className='py-2'>{message}</p>}
            <button
              className='button btn--medium btn--primary'
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Alert;
