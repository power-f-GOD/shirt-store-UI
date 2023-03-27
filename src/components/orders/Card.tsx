import { memo, FC } from 'react';

import { Skeleton, Stack, Text } from 'src/components/shared';
import { APIOrderProps } from 'src/types';
import { formatNumber } from 'src/utils';

const _Card: FC<
  Partial<APIOrderProps> & {
    index: number;
    erred?: boolean;
  }
> = (props) => {
  const { index, cost, actual_cost, discount, _id, item_count } = props;

  return (
    <Stack
      as="li"
      className={`relative transition p-4 gap-1.5 rounded-xl border border-solid overflow-clip border-black/10 anim__fadeInUpTiny`}
      animationDelay={`${index * 0.125}s`}>
      <Stack className="flex-row gap-5 justify-between">
        <Text>Order #{_id?.slice(0, 8).toUpperCase() || <Skeleton />}</Text>
        <Text as="small">
          <Text className="opacity-50">Discount:</Text>{' '}
          <Text className="text-red-500">
            {typeof discount === 'number' ? (
              `-${discount * 100}%`
            ) : (
              <Skeleton />
            )}
          </Text>
        </Text>
      </Stack>
      <Text as="small">
        <Text className="opacity-50">Item Count:</Text>{' '}
        {item_count || <Skeleton />}
      </Text>
      <Text as="small">
        <Text className="opacity-50">Cost:</Text>{' '}
        {cost ? (
          formatNumber(cost, {
            currency: 'USD',
            style: 'currency'
          })
        ) : (
          <Skeleton />
        )}
      </Text>
      <Text as="small">
        <Text className="opacity-50">Actual Cost:</Text>{' '}
        {actual_cost ? (
          formatNumber(actual_cost, {
            currency: 'USD',
            style: 'currency'
          })
        ) : (
          <Skeleton />
        )}
      </Text>
    </Stack>
  );
};

export const Card = memo(_Card);
