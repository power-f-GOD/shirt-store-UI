import { render } from '@testing-library/react';

import { Skeleton } from 'src/components/shared';

it('renders the Skeleton component unchanged', () => {
  const { container } = render(<Skeleton />);

  expect(container).toMatchSnapshot();
});
