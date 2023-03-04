import { FetchProps } from './shared';

export type ShirtsActionPayload = FetchProps<Partial<APIShirtProps>[]>;

export interface APIShirtProps {
  _id: string;
  name: string;
  price: number;
  image_url: string;
}
