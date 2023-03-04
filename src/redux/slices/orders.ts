import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ordersState } from 'src/constants';
import { OrdersActionPayload } from 'src/types';
import { resolveState } from '../__utils';

export const ordersSlice = createSlice({
  initialState: ordersState,
  name: 'orders',
  reducers: {
    orders: (state, action: PayloadAction<OrdersActionPayload>) =>
      resolveState(state || ordersState, action)
  }
});

export const { orders } = {
  ...ordersSlice.actions
};

export const ordersReducers = {
  orders: ordersSlice.reducer
};
