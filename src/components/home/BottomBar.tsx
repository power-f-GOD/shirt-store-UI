import { Check } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { memo, FC, useCallback, useEffect } from 'react';

import { Stack, Text } from 'src/components/shared';
import { dispatch, orders, useTypedSelector } from 'src/redux';
import { BasketProps } from 'src/types';
import { formatNumber, isEmptyObject } from 'src/utils';

const _BottomBar: FC<Pick<BasketProps, 'item_count'>> = ({ item_count }) => {
  const router = useRouter();
  const {
    actual_cost,
    cost,
    discount,
    __stale,
    __placed,
    items,
    authenticated,
    status
  } =
    useTypedSelector(
      (state) => ({
        status: state.orders.status,
        ...state.orders.extra,
        authenticated: state.user.data?.authenticated
      }),
      (a, b) =>
        a.cost === b.cost && a.__stale === b.__stale && a.status === b.status
    ) || {};
  const isPending = status === 'pending';

  useEffect(() => {
    if (__placed && authenticated && !isEmptyObject(items || {})) {
      // create order
      console.log('create order');
    } else {
      dispatch(
        orders({
          // extra: { items: {}, actual_cost: 0, cost: 0 },
          status: 'inert'
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated, __placed]);

  return (
    <Stack
      as="footer"
      className="sticky bottom-0 z-30 p-5 py-3 mt-20 flex-row w-full max-w-xl mx-auto justify-between items-center bg-white/90 backdrop-blur-sm border-t border-b-0 border-solid border-gray-200 rounded-tl-2xl rounded-tr-2xl anim__fadeInUpBig sm:rounded-2xl sm:bottom-8 sm:border sm:shadow-lg sm:shadow-black/5 lg:mt-24 lg:py-4"
      animationDelay={`${0.125 * 8}s`}>
      <Stack className="">
        <Text as="small" className="text-xs">
          {item_count < 0 ? 0 : item_count} item{item_count === 1 ? '' : 's'}
          {!!actual_cost && !!discount && (
            <Text
              as="small"
              className={`text-red-500 text-xs ml-2 ${
                __stale ? ' opacity-40' : ''
              }`}
              aria-hidden={__stale}>
              (-
              {formatNumber(discount * 100, {
                maximumFractionDigits: 3
              })}
              % <Text className="hidden sm:inline">discount</Text>)
            </Text>
          )}
        </Text>

        <Stack
          className={`font-bold flex-row items-end gap-1.5 transition duration-300${
            __stale ? ' opacity-30' : ''
          }`}
          aria-hidden={__stale}>
          <Text className="text-2xl">
            {formatNumber(cost || 0, {
              currency: 'USD',
              style: 'currency'
            })}
          </Text>
          {!!actual_cost && (
            <Text className="text-base opacity-50 mb-0.5 line-through">
              {formatNumber(actual_cost, {
                currency: 'USD',
                style: 'currency'
              })}
            </Text>
          )}
        </Stack>
      </Stack>

      <Button
        variant="contained"
        className="bg-black py-3 px-5 rounded-xl hover:bg-black/70 lg:py-3.5 lg:px-6"
        disabled={item_count < 1 || isPending}
        onClick={useCallback(() => {
          if (!authenticated) {
            router.push('/auth');
            dispatch(orders({ extra: { __placed: true }, status: 'pending' }));
          }
          // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [authenticated])}>
        {isPending ? (
          'Just a sec...'
        ) : (
          <>
            Checkout <Check className="ml-1 w-5" />
          </>
        )}
      </Button>
    </Stack>
  );
};

export const BottomBar = memo(_BottomBar);
