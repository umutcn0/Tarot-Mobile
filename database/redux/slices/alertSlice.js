import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isVisible: false,
  title: '',
  message: '',
  buttonText: 'Tamam'
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    showAlert: (state, action) => {
      state.isVisible = true;
      state.title = action.payload.title;
      state.message = action.payload.message;
      state.buttonText = action.payload.buttonText || 'Tamam';
    },
    hideAlert: (state) => {
      state.isVisible = false;
      state.title = '';
      state.message = '';
      state.buttonText = 'Tamam';
    }
  }
});

export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer; 