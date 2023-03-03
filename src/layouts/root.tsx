'use client';

import { Armata } from 'next/font/google';
import StylesProvider from '@mui/styles/StylesProvider';

import 'src/styles/index.scss';
import { Stack, Text } from 'src/components/shared';
import RootStyleRegistry from './__emotion';

const inter = Armata({ subsets: ['latin'], weight: '400' });

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <StylesProvider injectFirst>
        <RootStyleRegistry>
          <body className={`${inter.className} max-w-5xl mx-auto`}>
            <Stack
              as="header"
              className="z-30 p-5 py-3 mb-5 bg-white/80 backdrop-blur-sm border-b border-0 border-solid border-gray-200 anim__fadeIn md:py-5 lg:py-10 lg:mb-10">
              <Text as="h1">Shirt Store</Text>
            </Stack>
            {children}
          </body>
        </RootStyleRegistry>
      </StylesProvider>
    </html>
  );
};

export default RootLayout;
