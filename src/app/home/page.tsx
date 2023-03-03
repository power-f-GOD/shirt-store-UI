/** @jsxImportSource @emotion/react */
'use client';

import { useEffect, useState } from 'react';

import { Stack } from 'src/components/shared';
import { Card, BottomBar } from 'src/components/home';

const getShirts = () => {
  return [
    { name: 'Alexander McQueen', image_url: '' },
    { name: 'Amiri', image_url: '' },
    { name: 'Burberry', image_url: '' },
    { name: 'Saint Laurent', image_url: '' },
    { name: 'Givenchy', image_url: '' }
  ];
};

const Home = () => {
  const [shirts, setShirts] = useState<
    Array<{ name: string; image_url: string }>
  >(Array(5).fill({}));

  useEffect(() => {
    setShirts(getShirts());
  }, []);

  return (
    <>
      <Stack as="main">
        <Stack
          as="ul"
          className={`grid m-0 px-5 gap-5 list-none w-full max-w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`}>
          {shirts.map(({ name, image_url }, i) => (
            <Card key={i} index={i + 1} name={name} image_url={image_url} />
          ))}
        </Stack>
      </Stack>

      <BottomBar />
    </>
  );
};

export default Home;
