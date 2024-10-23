import { combineReducers } from '@reduxjs/toolkit';
import { graphSlice } from '@/entities/graph';
import { messageSlice } from '@/entities/message';
import { p2pSlice } from '@/entities/p2p';
import { simulatorSlice } from '@/pages/Simulator';
import type { UnknownAction } from '@reduxjs/toolkit';

const combinedReducer = combineReducers({
  message: messageSlice.reducer,
  simulator: simulatorSlice.reducer,
  p2p: p2pSlice.reducer,
  [graphSlice.reducerPath]: graphSlice.reducer,
});

type CombinedState = ReturnType<typeof combinedReducer>;

export const rootReducer = (state: CombinedState | undefined, action: UnknownAction) => {
  return combinedReducer(state, action);
};

export type RootReducer = typeof rootReducer;
