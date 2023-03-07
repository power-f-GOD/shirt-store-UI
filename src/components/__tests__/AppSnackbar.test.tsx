import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider as ReduxProvider } from 'react-redux';

import store from 'src/redux/store';
import { AppSnackbar } from 'src/components/AppSnackbar';
import { snackbar } from 'src/redux/slices';
import { act } from 'react-dom/test-utils';

describe('AppSnackbar', () => {
  it('renders the AppSnackbar component when redux `snackbar` action is dispatched', async () => {
    const { container } = render(
      <ReduxProvider store={store}>
        <AppSnackbar />
      </ReduxProvider>
    );

    jest.spyOn(store, 'dispatch');
    act(() => {
      store.dispatch(snackbar({ open: true, message: 'Snackbar!' }));
    });
    expect(store.dispatch).toHaveBeenCalled();
    await new Promise((resolve) => {
      setTimeout(resolve, 100);
    });

    const appSnackbar = container.querySelector('.MuiSnackbar-root');

    expect(appSnackbar).not.toBeNull();
  });
});
