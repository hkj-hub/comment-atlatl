import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';

// Refactor: https://feature-sliced.design/docs/guides/examples/types を参考に app に移動する

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

// tsconfigで strict: false にするとRootStateがanyになる
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
