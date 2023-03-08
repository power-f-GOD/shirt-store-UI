import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider as ReduxProvider } from 'react-redux';

import store from 'src/redux/store';
import { BottomBar } from 'src/components/home/BottomBar';

jest.mock('next/navigation', () => require('next-router-mock'));

describe('BottomBar', () => {
  it('renders the Shirt Store BottomBar', async () => {
    const { container, findByText } = render(
      <ReduxProvider store={store}>
        <BottomBar item_count={20} />
      </ReduxProvider>
    );
    const bottomBar = container.querySelector('footer');

    expect(bottomBar).not.toBeNull();
    expect(findByText('20 items')).resolves.toBeTruthy();
    expect(findByText('0 items')).rejects.toBeTruthy();
  });
});
