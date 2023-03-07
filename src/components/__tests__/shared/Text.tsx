import { render } from '@testing-library/react';

import { Text } from 'src/components/shared';

it('renders the Text component unchanged', () => {
  const { container } = render(<Text />);

  expect(container).toMatchSnapshot();
});
