import { Check } from '@mui/icons-material';
import { Button } from '@mui/material';
import { memo } from 'react';

import { Stack, Text } from 'src/components';

const _BottomBar = () => {
  return (
    <Stack
      as="footer"
      className="sticky bottom-0 z-30 p-5 py-3 mt-5 flex-row w-full max-w-xl mx-auto justify-between items-center bg-white/90 backdrop-blur-sm border-t border-b-0 border-solid border-gray-200 rounded-tl-2xl rounded-tr-2xl anim__fadeInUpBig sm:rounded-2xl sm:bottom-5 sm:border sm:shadow-lg sm:shadow-black/5 lg:mt-24 lg:py-4"
      animationDelay={`${0.125 * 8}s`}>
      <Stack className="">
        <Text as="small" className="text-xs">
          24 items
        </Text>

        <Text className="font-bold text-2xl">$60</Text>
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
