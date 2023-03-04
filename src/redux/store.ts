import { configureStore, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { DEVELOPMENT } from 'src/constants/misc';
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

export default store;
