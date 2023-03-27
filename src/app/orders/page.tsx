'use client';

import { useCallback } from 'react';
import Link from 'next/link';

import { Stack } from 'src/components/shared/Stack';
import { Card } from 'src/components/orders';
import { useTypedSelector } from 'src/redux/store';
import { fetchOrders } from 'src/services';
import { APIOrderProps } from 'src/types';
import { useAuthGuard } from 'src/hooks';

const Orders = () => {
  const { data, err, status } = useTypedSelector(
    (state) => state.orders,
    (a, b) => a.data?.length === b.data?.length
  );
  const isLoading = status !== 'fulfilled';

  useAuthGuard(() => {
    fetchOrders({ count: 50 });
  });

  return (
    <Stack as="main">
      <Stack
        as="ul"
        className={`grid m-0 px-5 gap-5 list-none w-full max-w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`}>
        {(data?.length
          ? data
          : (Array(5).fill({}) as Partial<APIOrderProps>[])
        ).map(
          useCallback(
            ({ cost, _id, item_count, actual_cost, discount }, i) => {
              return (
                <Card
                  _id={_id}
                  key={i}
                  index={i + 1}
                  erred={!isLoading || err}
                  cost={cost}
                  actual_cost={actual_cost}
                  discount={discount}
                  item_count={item_count}
                />
              );
            },
            // eslint-disable-next-line react-hooks/exhaustive-deps
            [isLoading]
          )
        )}
      </Stack>

      <Stack className="p-5 w-full text-end my-5">
        <Link
          href="/"
          className="no-underline text-primary hover:underline focus:underline">
          &lt;&lt; Home
        </Link>
      </Stack>
    </Stack>
  );
};

export default Orders;
