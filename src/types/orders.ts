import { FetchProps } from './shared';

export type OrdersActionPayload = FetchProps<APIOrderProps[]>;

export interface APIOrderItemProps {
  name: string;
  count: number;
  cost?: number;
  actual_cost?: number;
  price?: number;
}

export interface APIOrderProps {
  _id: string;
  items: APIOrderItemProps[];
  item_count: number;
  actual_cost: number;
  cost: number;
  discount: number;
}
