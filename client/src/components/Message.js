import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Message = ({ message }) => {
  // const notify = () => toast(message);
  useEffect(() => {
    toast(message);
  }, [message]);

  return (
    <div>
      <ToastContainer
        limit={1}
        position='bottom-right'
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Message;
