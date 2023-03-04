import { OrdersActionPayload } from 'src/types/orders';
import { httpStatusPropsState } from './shared';

export const ordersState: OrdersActionPayload = {
  ...httpStatusPropsState,
  data: [],
  extra: {}
};
