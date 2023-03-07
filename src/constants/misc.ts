import { SnackbarProps } from 'src/types/misc';

export const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
export const API_PORT = +(process.env.NEXT_PUBLIC_API_PORT || 0);
export const IS_DEVELOPMENT =
  process.env.NEXT_PUBLIC_MODE === 'development' ||
  process.env.NODE_ENV === 'development';
export const HTTP_BASE_URL = `http://${API_HOST}`.concat(
  API_HOST === 'localhost' ? `:${API_PORT}` : ''
);
export const API_BASE_URL = HTTP_BASE_URL + '/api';
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
