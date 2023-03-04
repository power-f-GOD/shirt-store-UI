import { FetchProps } from './shared';

export type ShirtsActionPayload = FetchProps<APIShirtSeedProps[]>;

export interface APIShirtSeedProps {
  _id: string;
  name: string;
  price: number;
  image_url: string;
}
