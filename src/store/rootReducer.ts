import { combineReducers } from '@reduxjs/toolkit';
import { messageSlice } from './slices/messageSlice';
import { p2pSlice } from './slices/p2pSlice';
import { simulatorSlice } from './slices/simulatorSlice';
import type { UnknownAction } from '@reduxjs/toolkit';

const combinedReducer = combineReducers({
  message: messageSlice.reducer,
  simulator: simulatorSlice.reducer,
  p2p: p2pSlice.reducer,
});

type CombinedState = ReturnType<typeof combinedReducer>;

export const rootReducer = (state: CombinedState | undefined, action: UnknownAction) => {
  return combinedReducer(state, action);
};

export type RootReducer = typeof rootReducer;
