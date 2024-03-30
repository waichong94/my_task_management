import React, { useEffect } from "react";
import { usePage } from '@inertiajs/react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FlashMessageList = ({}) => {
  const { flashMessage } = usePage().props;

  useEffect(() => {
    if (flashMessage === null) {
      return;
    }
    if (flashMessage.type === 'success') {
      toast.success(flashMessage.message, {
        containerId: 'flashMessages',
      });
    } else if (flashMessage.type === 'error') {
      toast.error(flashMessage.message, {
        containerId: 'flashMessages',
      });
    }
  }, [flashMessage]);

  return (
    <ToastContainer
      enableMultiContainer
      containerId={"flashMessages"}
      position="top-right"
      autoClose={5000}
      hideProgressBar
      pauseOnFocusLoss
      pauseOnHover={false}
      theme="colored"
    />
  );
};

export default FlashMessageList;
