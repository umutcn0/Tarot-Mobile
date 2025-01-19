import { useDispatch } from 'react-redux';
import { showAlert } from '../database/redux/slices/alertSlice';

export const useAlert = () => {
  const dispatch = useDispatch();

  const alert = (title, message, buttonText = 'Tamam') => {
    dispatch(showAlert({ title, message, buttonText }));
  };

  return alert;
};

export default useAlert; 