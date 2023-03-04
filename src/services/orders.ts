import { APIOrderProps } from 'src/types';
import { Http } from 'src/utils';
import { dispatch, orders } from 'src/redux';
import { normalizeResponse } from './__utils';

export const fetchOrders = async (query: { skip?: number; count: number }) => {
  dispatch(orders({ status: 'pending', err: false }));

  try {
    const response = await Http.get<APIOrderProps[]>(
      `/orders?skip=${query.skip || 0}&count=${query.count}`,
      true
    );

    dispatch(orders(normalizeResponse(response, query.count)));
  } catch (e) {
    Http.logError(e, orders);
  }
};

export const createOrder = async (data: Partial<APIOrderProps>) => {
  dispatch(orders({ status: 'pending', err: false }));

  try {
    const response = await Http.post<Record<string, APIOrderProps>>(
      `/orders`,
      data,
      true
    );

    dispatch(orders({ status: 'fulfilled', err: !!response.error }));
  } catch (e: any) {
    Http.logError(orders);
  }
};
