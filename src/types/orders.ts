import { FetchProps } from './shared';

export type OrdersActionPayload = FetchProps<
  APIOrderProps[],
  Partial<APIOrderProps & { __stale?: boolean; __placed?: boolean }>
>;

export interface APIOrderItemProps {
  _id?: string;
  name?: string;
  count: number;
  cost?: number;
  actual_cost?: number;
  price?: number;
}

export interface APIOrderProps {
  _id?: string;
  items?: Record<string, APIOrderItemProps>;
  item_count?: number;
  actual_cost: number;
  cost: number;
  discount: number;
}
