import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { httpStatusPropsState } from 'src/constants/misc';
import { OrdersActionPayload } from 'src/types';
import { resolveState } from '../__utils';

const initialState: OrdersActionPayload = {
  ...httpStatusPropsState,
  data: [],
  extra: { __stale: true, __placed: false }
};

export const ordersSlice = createSlice({
  initialState,
  name: 'orders',
  reducers: {
    orders: (state, action: PayloadAction<OrdersActionPayload>) =>
      resolveState(state || initialState, action)
  }
});

export const { orders } = {
  ...ordersSlice.actions
};

export const ordersReducers = {
  orders: ordersSlice.reducer
};
