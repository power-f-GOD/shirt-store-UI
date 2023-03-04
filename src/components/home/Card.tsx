import { memo, FC, useCallback, Dispatch, useState } from 'react';
import { IconButton } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

import S from 'src/styles/home.module.scss';
import { Img, Skeleton, Stack, Text } from 'src/components/shared';
import { Action, APIShirtProps } from 'src/types';
import { IMG_BASE_URL } from 'src/constants';
import { useTypedSelector } from 'src/redux';

const _Card: FC<
  Partial<APIShirtProps> & {
    index: number;
    dispatch: Dispatch<Action>;
  }
> = (props) => {
  const { name, image_url, index, price, dispatch } = props;
  const { discount, item } = useTypedSelector(
    (state) => ({
      discount: state.orders.extra?.discount || 0,
      item: name ? state.orders.extra?.items?.[name] : null
    }),
    (a, b) => a.item?.cost === b.item?.cost && a.discount === b.discount
  );
  const [count, setCount] = useState(0);
  const { actual_cost, cost } = item || {};

  const handleChangeItem = useCallback(
    (type: Action['type']) => () => {
      setCount((prev) => {
        const isAdd = type === 'Add';

        if (!name || (!isAdd && prev! <= 0) || (isAdd && prev! >= 30)) {
          return prev;
        }

        const count = prev + (isAdd ? 1 : -1);

        // Ensure to defer setState/dispatch to prevent the (bad setState) console error
        setTimeout(() => dispatch({ type, payload: { name, count } }));

        return count;
      });
    },
    [name, dispatch]
  );

  return (
    <Stack
      as="li"
      className={`${S.Card} ${
        count ? S.added : ''
      } relative transition m-0 h-80 rounded-2xl border border-solid overflow-clip bg-black/5 border-black/5 anim__fadeInUpTiny`}
      animationDelay={`${index * 0.125}s`}>
      {image_url ? (
        <Img
          className="transition duration-300 anim__fadeIn"
          src={`${IMG_BASE_URL}${image_url}`}
          alt={`${name} shirt`}
        />
      ) : (
        <Skeleton className="w-full h-full" />
      )}
      <Stack
        className={`${S.tray} absolute bottom-0 w-full grid transition-all duration-300 grid-cols-3 flex-row p-5 items-end justify-between pt-5 bg-white/60 backdrop-blur-sm`}>
        <Text as="h2" className="col-span-2 text-xl">
          {name || <Skeleton height="1em" className="w-full" />}
        </Text>

        <Stack className="ml-auto">
          <Text as="small">Price:</Text>
          <Text className="font-bold text-3xl">
            {price ? `$${price}` : <Skeleton height="1em" className="-mb-1" />}
          </Text>
        </Stack>

        <Stack className="flex-row items-end justify-center gap-1.5 border-0 border-t border-solid pt-5 mt-5 w-full col-span-3 border-black/10">
          <Stack className="mr-auto">
            <Text as="small" className="text-xs">
              Total Amount:
            </Text>
            <Text className="font-bold text-lg truncate">
              <Text className="">${cost || 0}</Text>
              {!!actual_cost && (
                <>
                  <Text className="opacity-40 ml-2 text-base line-through">
                    ${actual_cost || 0}
                  </Text>
                  <Text as="small" className="text-red-500 text-xs ml-2">
                    (-{discount * 100}%)
                  </Text>
                </>
              )}
            </Text>
          </Stack>

          <IconButton
            className="border border-solid border-black/10 w-8 h-8"
            onClick={handleChangeItem('Remove')}>
            <Remove />
          </IconButton>
          <Text
            className="text-lg justify-center inline-flex"
            style={{ minWidth: `${count?.toString().length || 1}ch` }}>
            {count || 0}
          </Text>
          <IconButton
            className="border border-solid border-black/10 w-8 h-8"
            onClick={handleChangeItem('Add')}>
            <Add />
          </IconButton>
        </Stack>
      </Stack>
    </Stack>
  );
};

export const Card = memo(_Card);
