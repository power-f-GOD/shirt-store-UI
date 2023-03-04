import { dispatch, orders, patch } from 'src/redux';
import { APIOrderProps } from 'src/types';
import { SocketPathsEnum, SocketResponsePayload } from './__types';

export const ordersPath = (payload: SocketResponsePayload<APIOrderProps>) => {
  const { data, path } = payload;

  switch (path) {
    case SocketPathsEnum.COMPUTE_DISCOUNT: {
      const itemPropsToUpdate = [];
      const itemValuesToUpdate = [];

      for (const name in data.items) {
        itemPropsToUpdate.push(`extra.items.${name}`);
        itemValuesToUpdate.push(data.items[name]);
      }

      for (const field of [
        'discount',
        'actual_cost',
        'cost'
      ] as (keyof APIOrderProps)[]) {
        itemPropsToUpdate.push(`extra.${field}`);
        itemValuesToUpdate.push(data[field]);
      }

      patch(orders, 'orders', itemPropsToUpdate, itemValuesToUpdate);
      break;
    }
    default: {
      dispatch(orders({}));
    }
  }
};
