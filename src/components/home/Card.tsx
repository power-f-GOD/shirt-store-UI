import { memo, FC, useCallback, ReactEventHandler } from 'react';
import Image from 'next/image';
import { IconButton } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

import S from 'src/styles/home.module.scss';
import { Img, Skeleton, Stack, Text } from 'src/components';

const _Card: FC<{ name: string; image_url: string; index: number }> = ({
  name,
  image_url,
  index
}) => {
  return (
    <Stack
      as="li"
      className={`${S.Card} relative transition m-0 h-80 rounded-2xl border border-solid overflow-clip bg-black/5 border-black/5 anim__fadeInUpTiny`}
      animationDelay={`${index * 0.125}s`}>
      {name ? (
        <Img
          className="transition duration-300"
          src={image_url || `/${name.replace(' ', '-')}.png`}
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
          <Text className="font-bold text-3xl">$8</Text>
        </Stack>

        <Stack className="flex-row items-center justify-center gap-3 border-0 border-t border-solid pt-5 mt-5 w-full col-span-3 border-black/10">
          <Stack className="mr-auto">
            <Text as="small" className="text-xs">
              Total Amount:
            </Text>
            <Text className="font-bold text-lg">
              <Text className="">$24</Text>
              <Text className="opacity-40 ml-2 line-through">$24</Text>
              <Text as="small" className="text-red-500 text-xs ml-2">
                (-10%)
              </Text>
            </Text>
          </Stack>

          <IconButton className="border border-solid border-black/10 w-10 h-10">
            <Remove />
          </IconButton>
          <Text className="text-lg">3</Text>
          <IconButton className="border border-solid border-black/10 w-10 h-10">
            <Add />
          </IconButton>
        </Stack>
      </Stack>
    </Stack>
  );
};

export const Card = memo(_Card);
