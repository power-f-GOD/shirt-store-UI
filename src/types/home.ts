import { APIOrderItemProps } from './orders';

export interface BasketProps {
  /** Take note: `items` here is a map of item `name`s to item `{ count: number; }` ... So,
   * `{
   *   [name: string]: { count: number }
   * }`.
   * This is so because, as much as possible, we want to reduce the size of the payload sent, via socket, to the back-end, hence makes the request/response faster and reduce bandwidth as well.  */
  items: Record<string, Pick<APIOrderItemProps, 'count' | 'price'>>;
  item_count: number;
}
