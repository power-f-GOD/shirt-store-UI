import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider as ReduxProvider } from 'react-redux';

import store from 'src/redux/store';
import Root from '../page';

describe('Root', () => {
  it('renders Root component unchanged', async () => {
    const { container } = render(
      <ReduxProvider store={store}>
        <Root />
      </ReduxProvider>
    );

    expect(container).toMatchSnapshot();
  });
});
