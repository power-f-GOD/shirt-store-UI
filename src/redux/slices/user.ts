import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { httpStatusPropsState } from 'src/constants/misc';
import { FetchProps } from 'src/types';
import { APIUserProps } from 'src/types/user';

export const userSlice = createSlice({
  initialState: {
    ...httpStatusPropsState,
    data: {
      _id: '',
      username: ''
    }
  } as FetchProps<APIUserProps>,
  name: 'user',
  reducers: {
    user: (state, { payload }: PayloadAction<FetchProps<APIUserProps>>) => {
      return {
        ...state,
        ...payload,
        data: { ...state.data, ...payload.data }
      };
    }
  }
});

export const { user } = {
  ...userSlice.actions
};

export const userReducers = {
  user: userSlice.reducer
};
