import { DEVELOPMENT } from 'src/constants/misc';
import { dispatch, snackbar } from 'src/redux';
import { log } from 'src/utils';
import { SocketEventsEnum, SocketResponsePayload } from './__types';

export const miscRouter = (
  eventName: SocketEventsEnum,
  payload: SocketResponsePayload
) => {
  const { message } = payload;

  switch (eventName) {
    case SocketEventsEnum.EXCEPTION: {
      if (DEVELOPMENT) log('EXCEPTION:', payload);
      dispatch(
        snackbar({
          open: true,
          position: 'bottom',
          variant: 'filled',
          message,
          severity: message && /already/.test(message) ? 'info' : 'error'
        })
      );
    }
  }
};
