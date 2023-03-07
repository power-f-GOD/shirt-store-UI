import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Text } from 'src/components/shared';

describe('Text', () => {
  it('renders a Text', async () => {
    const { container } = render(<Text />);
    const text = container.querySelector('.Text');

    expect(text).not.toBeNull();
  });
});
