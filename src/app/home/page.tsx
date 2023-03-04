/** @jsxImportSource @emotion/react */
'use client';

import { Reducer, useEffect, useReducer } from 'react';

import { Stack } from 'src/components/shared';
import { Card, BottomBar } from 'src/components/home';
import { Action, BasketProps, ItemProps } from 'src/types';
import { fetchShirts } from 'src/services';
import { useTypedSelector } from 'src/redux';

// const computeCostsAfterDiscount = (itemMap: BasketProps['items']) => {
//   const items = Object.values(itemMap);

//   items.map((item) => {
//     console.log(item);
//   });
//   return [1, 2];
// };

const reducer = (
  state: BasketProps,
  { type, payload }: Action
): BasketProps => {
  const diff = type === 'Add' ? +1 : -1;
  const update: BasketProps = {
    ...structuredClone(state),
    item_count: state.item_count + diff
  };
  const item: ItemProps = { ...payload, ...state.items[payload.name] };

  item.count = (item.count ?? 0) + diff;
  if (item.count <= 0) item.count = 0;
  item.actual_cost = item.count * item.price;

  // const [cost1, cost2] = computeCostsAfterDiscount(update.items);

  update.discount = 0.2;
  item.cost = +(item.actual_cost * (1 - update.discount)).toFixed(2);
  update.items[payload.name]! = structuredClone(item);
  update.actual_cost = +(
    update.actual_cost +
    diff * (payload.price || item.price)
  ).toFixed(2);
  update.cost = +(update.actual_cost * (1 - update.discount)).toFixed(2);
  if (update.actual_cost <= 0) update.actual_cost = 0;
  if (update.cost <= 0) update.cost = 0;
  if (update.item_count <= 0) update.item_count = 0;

  return update;
};

const Home = () => {
  const shirts = useTypedSelector((state) => state.shirts.data);
  const [basket, dispatch] = useReducer<Reducer<BasketProps, Action>>(reducer, {
    items: {},
    item_count: 0,
    actual_cost: 0,
    cost: 0,
    discount: 0
  });

  useEffect(() => {
    fetchShirts();
  }, []);

  return (
    <>
      <Stack as="main">
        <Stack
          as="ul"
          className={`grid m-0 px-5 gap-5 list-none w-full max-w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`}>
          {shirts!.map(({ name, image_url, price }, i) => {
            const { actual_cost, cost, count } = basket.items[name || ''] || {};

            return (
              <Card
                key={i}
                index={i + 1}
                name={name}
                cost={cost}
                price={price}
                image_url={image_url}
                count={count}
                discount={basket.discount}
                actual_cost={actual_cost}
                dispatch={dispatch}
              />
            );
          })}
        </Stack>
      </Stack>

      <BottomBar
        actual_cost={basket.actual_cost}
        cost={basket.cost}
        item_count={basket.item_count}
      />
    </>
  );
};

export default Home;
