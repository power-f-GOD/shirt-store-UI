import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { shallowEqual } from 'react-redux';
import { useTypedSelector } from 'src/redux';

export const useAuthGuard = () => {
  const { status, data } = useTypedSelector(
    (state) => state.user,
    shallowEqual
  );
  const router = useRouter();
  const pathname = usePathname();
  const isLoading = status !== 'fulfilled';
  const isAuthenticated = !!data?.authenticated;

  useEffect(() => {
    const isAuthRoute = location.pathname.includes('/auth');

    console.log({
      isAuthRoute,
      isAuthenticated,
      isLoading,
      pathname,
      l: location.pathname
    });
    if (
      isLoading ||
      (isAuthRoute && !isAuthenticated) ||
      (isAuthenticated && !isAuthRoute)
    ) {
      return;
    }

    // if (pathname === location.pathname) {
    // }

    router.replace(isAuthenticated ? '/' : '/auth');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isLoading, pathname]);

  return { ...data!, isLoading };
};
