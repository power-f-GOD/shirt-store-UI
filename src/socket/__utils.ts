import { SocketResponsePayloadBase } from './__types';

export const normalizeSocketPayload = <DataType = any>(
  data: DataType,
  payloadBase?: SocketResponsePayloadBase
) => {
  return {
    data,
    ...(payloadBase || {})
  };
};
