/** @jsxImportSource @emotion/react */

'use client';

import { Armata } from 'next/font/google';
import StylesProvider from '@mui/styles/StylesProvider';
import { Provider as ReduxProvider } from 'react-redux';
import { useState, useEffect } from 'react';
import { ThemeProvider } from '@emotion/react';
import Link from 'next/link';
import { AccountCircle } from '@mui/icons-material';
import { Button } from '@mui/material';

import 'src/styles/index.scss';
import store, { useTypedSelector } from 'src/redux/store';
import { authenticateUser, verifyUserAuth } from 'src/services';
import { theme } from 'src/utils/theme';
import { Stack } from 'src/components/shared/Stack';
import { Text } from 'src/components/shared/Text';
import { AppSnackbar } from 'src/components/AppSnackbar';
import RootStyleRegistry from './__emotion';

const inter = Armata({ subsets: ['latin'], weight: '400' });

const Layout = ({ children }: { children: React.ReactNode }) => {
  const user = useTypedSelector(
    (state) => ({
      ...state.user.data,
      loading: state.user.status !== 'fulfilled'
    }),
    (a, b) => a.authenticated === b.authenticated && a.loading === b.loading
  );
  // This is to fix server-client hydration errors logged in browser console
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    verifyUserAuth();

    // Hack: Doing this to fix issues with class styles not applying due to element being prepended before MUI styles
    const tailwindStylesEtAl = document.querySelector(
      'link[data-precedence="next.js"]'
    );

    if (tailwindStylesEtAl) {
      tailwindStylesEtAl.parentNode?.appendChild(tailwindStylesEtAl);
    }
  }, []);

  return (
    <html lang="en">
      <body className={`${inter.className} max-w-5xl mx-auto`}>
        <Stack
          as="header"
          className="Root z-30 p-5 py-3 my-5 flex-row items-center justify-between gap-2 bg-white/80 backdrop-blur-sm border-b border-0 border-solid border-gray-200 anim__fadeIn md:py-5 lg:py-10 lg:mb-10">
          <Link href="/" className="no-underline whitespace-nowrap">
            <Text as="h1">Shirt Store</Text>
          </Link>
          {user?.authenticated && (
            <Stack className="Root__username anim__fadeIn relative max-w-[30%] py-3">
              <Stack className=" flex-row items-center gap-1.5">
                <Text as="small" className="truncate">
                  {user?.username}
                </Text>
                <AccountCircle />
              </Stack>
              <Button
                variant="contained"
                className="absolute w-36 top-full right-0 z-30"
                disabled={user.loading}
                onClick={() => {
                  authenticateUser({
                    username: user.username!,
                    type: 'logout'
                  });
                }}>
                {user.loading ? 'Please, wait...' : 'Logout'}
              </Button>
            </Stack>
          )}
        </Stack>
        {children}
        {isMounted && <AppSnackbar />}
      </body>
    </html>
  );
};

const RootLayout = (props: { children: React.ReactNode }) => {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <StylesProvider injectFirst>
          <RootStyleRegistry>
            <ReduxProvider store={store}>
              <Layout {...props} />
            </ReduxProvider>
          </RootStyleRegistry>
        </StylesProvider>
      </ThemeProvider>
    </ReduxProvider>
  );
};
export default RootLayout;
