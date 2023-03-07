import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider as ReduxProvider } from 'react-redux';

import store from 'src/redux/store';
import Home from '../home/page';

describe('Home', () => {
  it('renders the Shirt Store Home', async () => {
    const { container } = render(
      <ReduxProvider store={store}>
        <Home />
      </ReduxProvider>
    );
    const home = container.querySelector('main');

    expect(home).not.toBeNull();
  });
});
