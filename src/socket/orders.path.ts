import { dispatch, orders } from 'src/redux';
import { APIOrderProps } from 'src/types';
import { SocketPathsEnum, SocketResponsePayload } from './__types';

export const ordersPath = (payload: SocketResponsePayload<APIOrderProps>) => {
  const { data, path } = payload;

  switch (path) {
    case SocketPathsEnum.COMPUTE_DISCOUNT: {
      dispatch(orders({ extra: data }));
      break;
    }
    default: {
      dispatch(orders({}));
    }
  }
};
