import { render } from '@testing-library/react';
import { Provider as ReduxProvider } from 'react-redux';

import store from 'src/redux/store';
import { AppSnackbar } from 'src/components/AppSnackbar';

it('renders the AppSnackbar component unchanged', () => {
  const { container } = render(
    <ReduxProvider store={store}>
      <AppSnackbar />
    </ReduxProvider>
  );

  expect(container).toMatchSnapshot();
});
