import { render } from '@testing-library/react';
import { Provider as ReduxProvider } from 'react-redux';

import store from 'src/redux/store';
import { BottomBar } from 'src/components/home';

jest.mock('next/navigation', () => require('next-router-mock'));

it('renders BottomBar component unchanged', () => {
  const { container } = render(
    <ReduxProvider store={store}>
      <BottomBar item_count={20} />
    </ReduxProvider>
  );

  expect(container).toMatchSnapshot();
});
