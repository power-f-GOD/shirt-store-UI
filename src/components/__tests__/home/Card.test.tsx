import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import S from 'src/styles/home.module.scss';
import { Card } from 'src/components/home/Card';

describe('Card', () => {
  it('renders the Shirt Store Card', async () => {
    const { container, findByText } = render(
      <Card
        index={0}
        price={8.0}
        dispatch={(...args) => {
          console.log(args);
        }}
      />
    );
    const card = container.querySelector(`.${S.Card}`);

    expect(card).not.toBeNull();
    expect(findByText('$8.0')).resolves.not.toBeFalsy();
    expect(findByText('$20.0')).rejects.toBeTruthy();
  });
});
