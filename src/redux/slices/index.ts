import { PayloadAction, combineReducers } from '@reduxjs/toolkit';

import { miscReducers, ordersReducers, seedReducers, userReducers } from '.';
import { StateProps } from '../store';

export * from './misc';
export * from './orders';
export * from './seed';
export * from './user';

export const rootReducer = (state: any, action: PayloadAction<any>) => {
  if (action.type === 'user/user' && action.payload._id === '') {
    state = {
      // shirts: state.shirts,
      snackbar: state.snackbar
    } as StateProps;
  }

  return combineReducers({
    ...miscReducers,
    ...ordersReducers,
    ...seedReducers,
    ...userReducers
  })(state, action);
};
