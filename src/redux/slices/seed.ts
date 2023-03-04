import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { shirtsState } from 'src/constants';
import { ShirtsActionPayload } from 'src/types';

export const shirtsSlice = createSlice({
  initialState: shirtsState,
  name: 'shirts',
  reducers: {
    shirts: (state, { payload }: PayloadAction<ShirtsActionPayload>) => ({
      ...state,
      ...payload
    })
  }
});

export const { shirts } = {
  ...shirtsSlice.actions
};

export const seedReducers = {
  shirts: shirtsSlice.reducer
};
