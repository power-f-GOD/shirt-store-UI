import { memo, FC, useCallback, Dispatch, useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

import S from 'src/styles/home.module.scss';
import { Img, Skeleton, Stack, Text } from 'src/components/shared';
import { Action, APIShirtProps } from 'src/types';
import { IMG_BASE_URL } from 'src/constants';
import { formatNumber } from 'src/utils';

const _Card: FC<
  Partial<APIShirtProps> & {
    index: number;
    initialCount?: number;
    isReset: boolean;
    dispatch: Dispatch<Action>;
  }
> = (props) => {
  const { name, image_url, index, price, initialCount, isReset, dispatch } =
    props;
  const [count, setCount] = useState(initialCount || 0);

  const handleChangeItem = useCallback(
    (type: Action['type']) => () => {
      setCount((prev) => {
        const isAdd = type === 'Add';

        if (!name || (!isAdd && prev! <= 0)) {
          // || (isAdd && prev! >= 30)) {
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

  useEffect(() => {
    if (isReset) setCount(0);
  }, [isReset]);
  console.log({ isReset, count, name });
  return (
    <Stack
      as="li"
      className={`${S.Card} ${
        count ? S.added : ''
      } relative transition m-0 h-80 rounded-2xl border border-solid overflow-clip bg-black/5 border-black/5 anim__fadeInUpTiny`}
      animationDelay={`${index * 0.125}s`}>
      {image_url ? (
        <Img src={`${IMG_BASE_URL}${image_url}`} alt={`${name} shirt`} />
      ) : (
        <Skeleton className="w-full h-full" />
      )}

      <Stack
        className={`${S.tray} absolute bottom-0 w-full grid transition-all duration-300 grid-cols-3 flex-row p-5 items-end justify-between pt-5 bg-white/70 backdrop-blur-sm`}>
        <Text as="h2" className="col-span-2 text-xl">
          {name || <Skeleton height="1em" className="w-full" />}
        </Text>

        <Stack className="ml-auto">
          <Text as="small">Price:</Text>
          <Text className="font-bold text-3xl">
            {price ? (
              formatNumber(price, {
                currency: 'USD',
                style: 'currency'
              })
            ) : (
              <Skeleton height="1em" className="-mb-1" />
            )}
          </Text>
        </Stack>

        <Stack className="flex-row items-end justify-center gap-1.5 border-0 border-t border-solid pt-5 mt-5 w-full col-span-3 border-black/10">
          <Stack className="mr-auto">
            <Text as="small" className="text-xs">
              Total Amount:
            </Text>
            <Text className="font-bold text-lg truncate">
              <Text className="">
                {formatNumber(price ? price * count : 0, {
                  currency: 'USD',
                  style: 'currency'
                })}
              </Text>
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
