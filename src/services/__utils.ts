import { FetchProps, APIBaseResponse } from 'src/types';

export const normalizeResponse = <Data = any>(
  response: APIBaseResponse<Data>,
  count: number | null,
  middleware?: (data: Data) => Data
): FetchProps<Data, any> => {
  const { data, message, error } = response;

  return {
    status: 'fulfilled',
    err: !!error,
    ...(data ? { data: middleware ? middleware(data) : data } : {}),
    message: !count
      ? message
      : (((data as Array<any>)?.length ||
        ((Object.keys(data || {})?.length || 0) < count && !error)
          ? "That's all. (It's the END)."
          : message || '') as string),
    extra: { listUpdateSentinel: Math.random() }
  };
};
