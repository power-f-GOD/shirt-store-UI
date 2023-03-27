import { PayloadAction } from '@reduxjs/toolkit';

import { FetchProps } from 'src/types';

export const resolveState = <
  State extends FetchProps<any[]>,
  Action extends PayloadAction<FetchProps<any[]>>
>(
  state: State,
  initialState: State,
  action: Action
) => {
  const { extra, status, data, message } = action.payload;

  return action.type === 'store/reset'
    ? initialState
    : {
        ...state,
        ...action.payload,
        status: status || state.status,
        message: message || state.message,
        data: data || state.data,
        extra: {
          ...state.extra,
          ...extra
        }
      };
};
