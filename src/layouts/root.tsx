/** @jsxImportSource @emotion/react */

'use client';

import { Armata } from 'next/font/google';
import StylesProvider from '@mui/styles/StylesProvider';
import { Provider as ReduxProvider } from 'react-redux';
import { useEffect } from 'react';

import 'src/styles/index.scss';
import store from 'src/redux/store';
import { Stack } from 'src/components/shared/Stack';
import { Text } from 'src/components/shared/Text';
import RootStyleRegistry from './__emotion';

const inter = Armata({ subsets: ['latin'], weight: '400' });

const Layout = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // Lazyload module (as we need `socket` only on the front-end), so no need fetching upfront, hence foster fast (initial) app load
    import('src/socket/init').then(({ initSocket }) => initSocket());
  }, []);

  return (
    <html lang="en">
      <body className={`${inter.className} max-w-5xl mx-auto`}>
        <Stack
          as="header"
          className="z-30 p-5 py-3 my-5 bg-white/80 backdrop-blur-sm border-b border-0 border-solid border-gray-200 anim__fadeIn md:py-5 lg:py-10 lg:mb-10">
          <Text as="h1">Shirt Store</Text>
        </Stack>
        {children}
      </body>
    </html>
  );
};

const RootLayout = (props: { children: React.ReactNode }) => {
  return (
    <ReduxProvider store={store}>
      <StylesProvider injectFirst>
        <RootStyleRegistry>
          <ReduxProvider store={store}>
            <Layout {...props} />
          </ReduxProvider>
        </RootStyleRegistry>
      </StylesProvider>
    </ReduxProvider>
  );
};
export default RootLayout;
