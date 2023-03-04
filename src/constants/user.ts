import { FetchProps } from 'src/types';
import { APIUserProps } from 'src/types/user';
import { httpStatusPropsState } from './shared';

export const userState: FetchProps<APIUserProps> = {
  ...httpStatusPropsState,
  data: {
    _id: '',
    name: ''
  }
};
