import { Http } from 'src/utils';
import { snackbar, user, dispatch } from 'src/redux';
import { APIUserProps } from 'src/types/user';

export const verifyUser = async () => {
  Http.token = localStorage.getItem('token');
  Http.token = Http.token === 'null' ? null : Http.token;
  dispatch(user({ status: 'pending' }));

  if (!Http.token) return;

  try {
    const { data, message } = await Http.get<APIUserProps>('/users/user', true);

    dispatch(user({ data, status: 'fulfilled' }));
    dispatch(
      snackbar({
        open: true,
        title: data ? `Hey, ${data.name}!` : false,
        message: message || 'Welcome back!😎',
        severity: 'success',
        position: 'top'
      })
    );
  } catch (e: any) {
    Http.logError(e, user);
  }
};
