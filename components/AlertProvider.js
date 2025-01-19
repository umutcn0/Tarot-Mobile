import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Alert from './Alert';
import { hideAlert } from '../database/redux/slices/alertSlice';

const AlertProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { isVisible, title, message, buttonText } = useSelector((state) => state.alert);

  const handleClose = () => {
    dispatch(hideAlert());
  };

  return (
    <>
      {children}
      <Alert
        isVisible={isVisible}
        onClose={handleClose}
        title={title}
        message={message}
        buttonText={buttonText}
      />
    </>
  );
};

export default AlertProvider; 