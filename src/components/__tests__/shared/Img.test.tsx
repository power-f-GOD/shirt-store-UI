import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Img } from 'src/components/shared';

describe('Img', () => {
  it('renders an Img', async () => {
    const { container } = render(<Img src="/img.png" alt="Image" />);
    const img = container.querySelector('img');

    expect(img).not.toBeNull();
  });
});
