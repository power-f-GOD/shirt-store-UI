import {
  ActionCreatorWithPayload,
  configureStore,
  Dispatch,
  PayloadAction
} from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { DEVELOPMENT } from 'src/constants/misc';
import { isEmptyObject, isObject } from 'src/utils';
import { rootReducer } from './slices';

const store = configureStore({
  reducer: rootReducer,
  devTools: DEVELOPMENT,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
});

export const dispatch: Dispatch<PayloadAction<any> | any> = store.dispatch;
export const getState = store.getState;

export type StateProps = ReturnType<typeof getState>;
export type StoreDispatch = ReturnType<typeof dispatch>;
export type StoreGetState = typeof getState;

// export const useTypedDispatch: () => StoreDispatch = useReduxDispatch;
export const useTypedSelector: TypedUseSelectorHook<StateProps> = useSelector;

/**
 * This function is mainly useful for when you want to update a target field prop in state and still preserve previous values without overrides. It helps you to not have to call `getState` everytime when you need to preserve or get past values.
 * @param actor - The action creator to the corresponding state value to update. E.g. `order`.
 * @param storeKey - The corresponding state (or store) key to update. E.g. `'orders'`.
 * @param fields - An array of strings of a JavaScript dot notation pattern to the particular field(s) to patch/update in state. E.g. `['orders.extra']`.
 * @param values - The values to update properties with. E.g. in the case of the example above, `[{ discount: 0.2 }]`.
 */
export const patch = <
  Value = any,
  Payload extends Record<string, any> = Record<string, any>
>(
  actor: ActionCreatorWithPayload<Payload>,
  storeKey: keyof StateProps,
  fields: string[],
  values: Value[]
) => {
  const executor = (
    _payload: Payload,
    _fields: string[],
    _values: Value[]
  ): Payload | undefined => {
    const [fieldsStrings, values] = [_fields.slice(), _values.slice()];
    const fieldsString = fieldsStrings.splice(0, 1)[0];
    const value = values.splice(0, 1)[0];
    const fieldKeys = fieldsString?.trim().split('.');

    if (isEmptyObject(_payload) || !fieldsString) return;

    const getPayload = (base: Payload, i: number): Payload => {
      // Augment base [payload] if in case field to set is not already/initially defined
      if (!base) base = {} as Payload;

      const propKey = fieldKeys[i];
      const prop = base[propKey];
      const valueIsObject = isObject(value);

      if (!propKey) return base;

      return structuredClone({
        ...base,
        [propKey]: fieldKeys[i + 1]
          ? getPayload(prop, i + 1)
          : valueIsObject
          ? { ...prop, ...value }
          : value
      } as Payload);
    };

    const updatedPayload = getPayload(_payload, 0);

    return {
      ...updatedPayload,
      ...(fieldsStrings.length
        ? executor(updatedPayload, fieldsStrings, values)
        : {})
    };
  };

  const payload = executor(
    { ...(getState()[storeKey] as any) },
    fields,
    values
  );

  if (!payload || isEmptyObject(payload)) return;
  dispatch(actor(payload));
};

export default store;
