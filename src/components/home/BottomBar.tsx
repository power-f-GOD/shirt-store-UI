import { Check } from '@mui/icons-material';
import { Button } from '@mui/material';
import { memo, FC } from 'react';

import { Stack, Text } from 'src/components/shared';
import { useTypedSelector } from 'src/redux';
import { BasketProps } from 'src/types';

const _BottomBar: FC<Pick<BasketProps, 'item_count'>> = ({ item_count }) => {
  const { actual_cost, cost } =
    useTypedSelector(
      (state) => state.orders.extra,
      (a, b) => a?.cost === b?.cost
    ) || {};

  return (
    <Stack
      as="footer"
      className="sticky bottom-0 z-30 p-5 py-3 mt-5 flex-row w-full max-w-xl mx-auto justify-between items-center bg-white/90 backdrop-blur-sm border-t border-b-0 border-solid border-gray-200 rounded-tl-2xl rounded-tr-2xl anim__fadeInUpBig sm:rounded-2xl sm:bottom-5 sm:border sm:shadow-lg sm:shadow-black/5 lg:mt-24 lg:py-4"
      animationDelay={`${0.125 * 8}s`}>
      <Stack className="">
        <Text as="small" className="text-xs">
          {item_count < 0 ? 0 : item_count} item{item_count === 1 ? '' : 's'}
        </Text>

        <Stack className="font-bold flex-row items-end gap-1.5">
          <Text className="text-2xl">${cost || 0}</Text>
          {!!actual_cost && (
            <Text className="text-base opacity-50 mb-0.5 line-through">
              ${actual_cost}
            </Text>
          )}
        </Stack>
      </Stack>

      <Button
        variant="contained"
        className="bg-black py-3 rounded-xl hover:bg-black/70 lg:py-3.5 lg:px-6">
        Checkout <Check className="ml-1.5" />
      </Button>
    </Stack>
  );
};

export const BottomBar = memo(_BottomBar);
