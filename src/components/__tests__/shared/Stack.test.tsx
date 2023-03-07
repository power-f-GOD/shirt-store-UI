import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Stack } from 'src/components/shared';

describe('Stack', () => {
  it('renders a Stack', async () => {
    const { container } = render(<Stack />);
    const stack = container.querySelector('.Stack');

    expect(stack).not.toBeNull();
  });
});
