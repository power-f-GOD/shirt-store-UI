import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider as ReduxProvider } from 'react-redux';

import store from 'src/redux/store';
import Home from '../home/page';

jest.mock('next/navigation', () => require('next-router-mock'));

describe('Home', () => {
  it('renders Home component unchanged', async () => {
    const { container } = render(
      <ReduxProvider store={store}>
        <Home />
      </ReduxProvider>
    );

    expect(container).toMatchSnapshot();
  });
});
