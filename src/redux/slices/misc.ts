import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SnackbarProps } from 'src/types';
import { snackbarState } from 'src/constants';

export const snackbarSlice = createSlice({
  initialState: snackbarState,
  name: 'snackbar',
  reducers: {
    snackbar: (state, action: PayloadAction<SnackbarProps>) => {
      const payload = { ...action.payload };

      if (payload.message) {
        payload.message = Array.isArray(payload.message)
          ? payload.message.join(' ')
          : payload.message;
      }

      return payload?.open
        ? { title: false, autoHide: true, ...payload }
        : { ...state, ...payload };
    }
  }
});

export const { snackbar } = {
  ...snackbarSlice.actions
};

export const miscReducers = {
  snackbar: snackbarSlice.reducer
};
