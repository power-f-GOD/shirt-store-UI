export enum SocketEventsEnum {
  EXCEPTION = 'exception',
  ORDER = 'order',
  MISC = 'misc'
}

export enum SocketPathsEnum {
  // order
  COMPUTE_DISCOUNT = 'COMPUTE_DISCOUNT'
}

export interface SocketResponsePayloadBase {
  path?: SocketPathsEnum;
  message?: string;
  error?: boolean;
}

export interface SocketResponsePayload<DataType = Record<string, any>>
  extends SocketResponsePayloadBase {
  data: DataType;
}
