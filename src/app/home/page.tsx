'use client';

import { Reducer, useCallback, useEffect, useReducer, useState } from 'react';

import { Stack } from 'src/components/shared/Stack';
import { Card, BottomBar } from 'src/components/home';
import { Action, BasketProps } from 'src/types';
import { getState, patch, useTypedSelector } from 'src/redux/store';
import { orders as ordersAction } from 'src/redux/slices/orders';
import { socketEmit, SocketEventsEnum, SocketPathsEnum } from 'src/socket';

const Home = () => {
  const { shirts, authenticated } = useTypedSelector(
    (state) => ({
      shirts: state.shirts.data,
      authenticated: !!state.user.data?.authenticated
    }),
    (a, b) =>
      a.authenticated === b.authenticated &&
      a.shirts?.length === b.shirts?.length
  );
  const [isReset, setIsReset] = useState(false);
  const [basket, localDispatch] = useReducer<Reducer<BasketProps, Action>>(
    (
      state: BasketProps,
      { type, payload }: Action<{ name: string; count: number }>
    ): BasketProps => {
      const diff = type === 'Add' ? +1 : -1;
      const basket: BasketProps = {
        ...structuredClone(state),
        item_count: (state.item_count < 0 ? 0 : state.item_count) + diff
      };

      basket.items[payload.name]! = { count: payload.count };
      if (basket.item_count < 0) basket.item_count = 0;

      return type === 'Remove All' ? { item_count: 0, items: {} } : basket;
    },
    {
      items: getState().orders.extra?.items || {},
      item_count: getState().orders.extra?.item_count || -1
    }
  );

  useEffect(() => {
    if (shirts![0]._id) return;
    import('src/services/seed').then(({ fetchShirts }) => fetchShirts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shirts?.[0]._id]);

  useEffect(() => {
    if (basket.item_count < 0) return;

    const itemsToUpdate = [];
    const itemValuesToUpdate = [];

    for (const name in basket.items) {
      itemsToUpdate.push(`extra.items.${name}`);
      itemValuesToUpdate.push(basket.items[name]);
    }

    itemsToUpdate.push('extra.item_count');
    itemValuesToUpdate.push(basket.item_count);
    patch(ordersAction, 'orders', itemsToUpdate, itemValuesToUpdate);
    setIsReset(false);
    socketEmit(
      SocketEventsEnum.ORDER,
      { items: basket.items },
      SocketPathsEnum.COMPUTE_DISCOUNT
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [basket.item_count]);

  useEffect(() => {
    setIsReset(!authenticated);
  }, [authenticated]);

  return (
    <>
      <Stack as="main">
        <Stack
          as="ul"
          className={`grid m-0 px-5 gap-5 list-none w-full max-w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`}>
          {shirts!.map(
            useCallback(
              ({ name, image_url, price }, i) => {
                return (
                  <Card
                    key={i}
                    index={i + 1}
                    name={name}
                    isReset={isReset}
                    initialCount={!name ? 0 : basket.items[name]?.count}
                    price={price}
                    image_url={image_url}
                    dispatch={localDispatch}
                  />
                );
              },
              [basket.items, isReset]
            )
          )}
        </Stack>
      </Stack>

      <BottomBar
        item_count={basket.item_count}
        onOrderCreated={useCallback(() => {
          localDispatch({ type: 'Remove All', payload: {} });
          setIsReset(true);
          try {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } catch (e) {
            window.scrollTo(0, 0);
          }
        }, [])}
      />
    </>
  );
};

export default Home;
