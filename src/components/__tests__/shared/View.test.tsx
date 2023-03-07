import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { View } from 'src/components/shared';

describe('View', () => {
  it('renders a View', async () => {
    const { container } = render(<View />);
    const view = container.querySelector('div');

    expect(view).not.toBeNull();
  });
});
