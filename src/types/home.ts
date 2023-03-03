export interface ItemProps {
  name: string;
  count?: number;
  cost?: number;
  actual_cost?: number;
  price: number;
}

export interface BasketProps {
  /** `items` here is a map of item `name`s to their properties.  */
  items: Record<string, ItemProps | undefined>;
  item_count: number;
  actual_cost: number;
  cost: number;
  discount: number;
}

export interface Action<Payload = ItemProps, Type = 'Add' | 'Remove'> {
  type: Type;
  payload: Payload;
}
