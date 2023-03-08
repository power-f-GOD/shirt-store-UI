import { Http } from 'src/utils';
import { snackbar, user, dispatch } from 'src/redux';
import { APIUserProps } from 'src/types/user';

export const verifyUserAuth = async () => {
  Http.token = localStorage.getItem('token');
  Http.token = Http.token === 'null' ? null : Http.token;
  dispatch(user({ status: 'pending' }));

  if (!Http.token) {
    dispatch(user({ status: 'fulfilled', data: { authenticated: false } }));
    return;
  }

  try {
    const { data } = await Http.get<APIUserProps>(`/users/${Http.token}`, true);

    dispatch(user({ data, status: 'fulfilled' }));
  } catch (e: any) {
    Http.logError(e, user);
  }
};

export const authenticateUser = async (_data: {
  username: string;
  type: 'login' | 'signup' | 'logout';
}) => {
  dispatch(user({ status: 'pending' }));

  try {
    const { data, message, error } = await Http.post<APIUserProps>(
      `/users/${_data.type !== 'signup' ? 'authenticate' : ''}`,
      _data
    );

    dispatch(user({ data, status: 'fulfilled' }));
    Http.token = data?.authenticated ? data._id : null;
    localStorage.setItem('token', data?._id || '');

    if (!error) {
      dispatch(
        snackbar({
          open: true,
          message,
          severity: data?.authenticated ? 'success' : 'info'
        })
      );
    }
  } catch (e: any) {
    Http.logError(e, user);
  }
};
