import { SnackbarProps } from 'src/types/misc';

export const DEVELOPMENT = process.env.NODE_ENV === 'development';
export const HTTP_BASE_URL =
  DEVELOPMENT || globalThis.location?.hostname.includes('localhost')
    ? 'http://localhost:3100'
    : 'https://shirt-store.com';
export const API_BASE_URL = HTTP_BASE_URL + '/api';
export const WS_BASE_URL =
  DEVELOPMENT || globalThis.location?.hostname.includes('localhost')
    ? 'ws://localhost:3101'
    : 'wss://shirt-store.com';
export const IMG_BASE_URL = `${HTTP_BASE_URL}/public/images`;

export const snackbarState: SnackbarProps = {
  open: false,
  message: ' ',
  severity: 'info',
  duration: 4000,
  title: false,
  autoHide: true,
  position: 'top'
};
