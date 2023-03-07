import { render } from '@testing-library/react';

import { Stack } from 'src/components/shared';

it('renders the Stack component unchanged', () => {
  const { container } = render(<Stack />);

  expect(container).toMatchSnapshot();
});
