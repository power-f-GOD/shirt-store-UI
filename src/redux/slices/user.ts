import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { httpStatusPropsState } from 'src/constants/misc';
import { FetchProps } from 'src/types';
import { APIUserProps } from 'src/types/user';

const initialState: FetchProps<APIUserProps> = {
  ...httpStatusPropsState,
  data: {
    _id: '',
    username: ''
  }
};

export const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    user: (state, { payload }: PayloadAction<FetchProps<APIUserProps>>) => {
      return {
        ...state,
        ...payload,
        data: { ...state.data, ...payload.data }
      };
    },
    reset: () => initialState
  }
});

export const { user } = {
  ...userSlice.actions
};

export const userReducers = {
  user: userSlice.reducer
};
