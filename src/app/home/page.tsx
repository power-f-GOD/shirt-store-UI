'use client';

import { Reducer, useCallback, useEffect, useReducer } from 'react';
import { shallowEqual } from 'react-redux';

import { Stack } from 'src/components/shared/Stack';
import { Card, BottomBar } from 'src/components/home';
import { Action, BasketProps } from 'src/types';
import { patch, useTypedSelector } from 'src/redux/store';
import { orders as ordersAction } from 'src/redux/slices/orders';
import { socketEmit, SocketEventsEnum, SocketPathsEnum } from 'src/socket';

const Home = () => {
  const shirts = useTypedSelector((state) => state.shirts.data, shallowEqual);
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

      return basket;
    },
    {
      items: {},
      item_count: -1
    }
  );

  useEffect(() => {
    import('src/services/seed').then(({ fetchShirts }) => fetchShirts());
  }, []);

  useEffect(() => {
    if (basket.item_count < 0) return;

    const itemsToUpdate = [];
    const itemValuesToUpdate = [];

    for (const name in basket.items) {
      itemsToUpdate.push(`extra.items.${name}`);
      itemValuesToUpdate.push(basket.items[name]);
    }

    patch(ordersAction, 'orders', itemsToUpdate, itemValuesToUpdate);
    socketEmit(
      SocketEventsEnum.ORDER,
      { items: basket.items },
      SocketPathsEnum.COMPUTE_DISCOUNT
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [basket.item_count]);

  return (
    <>
      <Stack as="main">
        <Stack
          as="ul"
          className={`grid m-0 px-5 gap-5 list-none w-full max-w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`}>
          {shirts!.map(
            useCallback(({ name, image_url, price }, i) => {
              return (
                <Card
                  key={i}
                  index={i + 1}
                  name={name}
                  price={price}
                  image_url={image_url}
                  dispatch={localDispatch}
                />
              );
            }, [])
          )}
        </Stack>
      </Stack>

      <BottomBar item_count={basket.item_count} />
    </>
  );
};

export default Home;
