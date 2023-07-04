import { AnyAction, combineReducers } from '@reduxjs/toolkit';
import { simulatorSlice } from './slices/simulatorSlice';
import { p2pSlice } from './slices/p2pSlice';
const combinedReducer = combineReducers({
  simulator: simulatorSlice.reducer,
  p2p: p2pSlice.reducer,
});
export const rootReducer = (state: any, action: AnyAction) => {
  return combinedReducer(state, action);
};

export type RootReducer = typeof rootReducer;
