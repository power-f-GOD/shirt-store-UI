import { render } from '@testing-library/react';

import { Img } from 'src/components/shared';

it('renders the Img component unchanged', () => {
  const { container } = render(<Img src="/img.png" alt="Image" />);

  expect(container).toMatchSnapshot();
});
