import { render } from '@testing-library/react';

import { View } from 'src/components/shared';

it('renders the View component unchanged', () => {
  const { container } = render(<View />);

  expect(container).toMatchSnapshot();
});
