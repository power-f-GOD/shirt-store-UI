import { render } from '@testing-library/react';

import { Card } from 'src/components/home';

it('renders Card unchanged', () => {
  const { container } = render(
    <Card
      index={0}
      price={8.0}
      dispatch={(...args) => {
        console.log(args);
      }}
    />
  );

  expect(container).toMatchSnapshot();
});
