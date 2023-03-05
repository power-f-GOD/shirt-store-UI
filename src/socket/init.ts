import { io } from 'socket.io-client';

import { getState } from 'src/redux/store';
import {
  SocketEventsEnum,
  SocketPathsEnum,
  SocketResponsePayload
} from './__types';
import { normalizeSocketPayload } from './__utils';
import { ordersPath } from './orders.path';
import { miscRouter } from './misc.router';
import { DEVELOPMENT, WS_BASE_URL } from 'src/constants/misc';
import { Http } from 'src/utils/http';
import { SocketProps } from 'src/types/misc';
import { log } from 'src/utils';

export let socket: ReturnType<typeof io> | null = null;

export const initSocket = (onAfterInit?: (socket: SocketProps) => void) => {
  // if (!getState().user.data!._id) return;
  openSocket();

  // ensure to activate router listener(s) only once connected to avoid duplicate socket responses as well
  socket!.once('connect', () => {
    activateSocketRouters();
  });
  socket!.on('connect', () => {
    log(`Sockets shook hands on ${WS_BASE_URL}! <${socket!.id}>`);
    if (onAfterInit) onAfterInit(socket);
  });
  socket!.on('disconnect', () => {
    log('Sockets called it a day!');
  });
};

export const openSocket = () => {
  if (socket?.connected) return;

  // ensure to init `io` only once to avoid duplicate/multiple socket instances
  if (!socket) {
    socket = io(WS_BASE_URL, {
      transports: ['websocket', 'polling'], // use WebSocket first, if available,
      reconnectionDelay: 5000,
      withCredentials: false,
      secure: process.env.NODE_ENV === 'production'
    });
  }

  socket.auth = { access_token: Http.token };
  setTimeout(() => socket!.connect()); // defer (with a setTimeout) so listeners are added before socket actually attempts connection
};

export const closeSocket = () => {
  if (!socket) return;
  if (socket.connected) socket.close();
};

export const activateSocketRouters = () => {
  if (!socket?.connected) {
    socket?.close();
    return;
  }

  socket.onAny(
    (eventName: SocketEventsEnum, payload: SocketResponsePayload) => {
      log(eventName, payload, 'ONANY');
      switch (eventName) {
        case SocketEventsEnum.ORDER:
          ordersPath(payload as SocketResponsePayload<any>);
          break;
        default:
          miscRouter(eventName, payload);
      }
    }
  );
};

export const socketEmit = <
  DataType extends Record<string, any> = Record<string, any>
>(
  eventName: SocketEventsEnum,
  data: Partial<DataType>,
  path?: SocketPathsEnum
) => {
  const { user } = getState();

  const emit = (socket: SocketProps) => {
    socket!.emit(eventName, normalizeSocketPayload(data, { path }));
  };

  // Revisit line
  if (user.data?._id === null) {
    socket?.close();
    return;
  }

  if (socket?.connected) emit(socket);
  else {
    if (DEVELOPMENT) {
      log(
        `Error: Could not emit event: '${eventName}': Sockets not connected.`
      );
    }

    if (!socket) initSocket(emit);
    else socket.connect();
  }
};

if (globalThis.window) initSocket();
