import { ShirtsActionPayload } from 'src/types/seed';
import { httpStatusPropsState } from './shared';

export const shirtsState: ShirtsActionPayload = {
  ...httpStatusPropsState,
  data: [{}, {}, {}, {}, {}],
  extra: {}
};
