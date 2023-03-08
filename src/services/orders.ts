import { APIOrderProps } from 'src/types';
import { Http } from 'src/utils';
import { dispatch, orders, snackbar } from 'src/redux';
import { normalizeResponse } from './__utils';

export const fetchOrders = async (query: { skip?: number; count: number }) => {
  dispatch(orders({ status: 'pending', err: false }));

  try {
    const response = await Http.get<APIOrderProps[]>(
      `/orders?skip=${query.skip || 0}&count=${query.count}`,
      true
    );

    dispatch(orders(normalizeResponse(response, query.count)));
  } catch (e: any) {
    Http.logError(e, orders);
  }
};

export const createOrder = async (
  data: Partial<APIOrderProps>,
  onSuccess: () => void
) => {
  dispatch(orders({ status: 'pending', err: false }));

  try {
    const { message } = await Http.post<Record<string, APIOrderProps>>(
      `/orders`,
      data,
      true
    );

    onSuccess();
    dispatch(
      orders({
        status: 'fulfilled',
        message,
        extra: { items: {}, cost: 0, actual_cost: 0 }
      })
    );

    if (message) {
      dispatch(snackbar({ open: true, message, severity: 'success' }));
    }
  } catch (e: any) {
    Http.logError(e, orders);
  }
};
