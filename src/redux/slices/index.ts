import { PayloadAction, combineReducers } from '@reduxjs/toolkit';

import { miscReducers, ordersReducers, seedReducers, userReducers } from '.';

export * from './misc';
export * from './orders';
export * from './seed';
export * from './user';

const appReducer = combineReducers({
  ...miscReducers,
  ...ordersReducers,
  ...seedReducers,
  ...userReducers
});

export const rootReducer = (state: any, action: PayloadAction<any>) => {
  const { snackbar, shirts } = state || {};

  if (action.type === 'store/reset') {
    return appReducer(
      {
        snackbar,
        shirts,
        orders: { extra: { __stale: false } },
        user: { status: 'fulfilled' }
      } as any,
      action
    );
  }

  return appReducer(state, action);
};
