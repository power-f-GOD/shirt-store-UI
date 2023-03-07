import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { httpStatusPropsState } from 'src/constants/misc';
import { ShirtsActionPayload } from 'src/types';

export const shirtsSlice = createSlice({
  initialState: {
    ...httpStatusPropsState,
    data: [{}, {}, {}, {}, {}],
    extra: {}
  } as ShirtsActionPayload,
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
