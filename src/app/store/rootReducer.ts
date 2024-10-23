import { combineReducers } from '@reduxjs/toolkit';
import { graphSlice } from '@/entities/graph';
import { messageSlice } from '@/entities/message';
import { p2pSlice } from '@/entities/p2p';
import { simulatorSlice } from '@/entities/simulator';
import type { UnknownAction } from '@reduxjs/toolkit';

const combinedReducer = combineReducers({
  [messageSlice.reducerPath]: messageSlice.reducer,
  [simulatorSlice.reducerPath]: simulatorSlice.reducer,
  [p2pSlice.reducerPath]: p2pSlice.reducer,
  [graphSlice.reducerPath]: graphSlice.reducer,
});

type CombinedState = ReturnType<typeof combinedReducer>;

export const rootReducer = (state: CombinedState | undefined, action: UnknownAction) => {
  return combinedReducer(state, action);
};

export type RootReducer = typeof rootReducer;
