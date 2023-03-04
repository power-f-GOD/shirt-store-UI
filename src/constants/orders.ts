import { APIOrderProps } from 'src/types/orders';
import { FetchProps } from 'src/types/shared';
import { httpStatusPropsState } from './shared';

export const ordersState: FetchProps<APIOrderProps[]> = {
  ...httpStatusPropsState,
  data: [],
  extra: {}
};
