import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Skeleton } from 'src/components/shared';

describe('Skeleton', () => {
  it('renders a Skeleton', async () => {
    const { container } = render(<Skeleton />);
    const skeleton = container.querySelector('.Skeleton');

    expect(skeleton).not.toBeNull();
  });
});
