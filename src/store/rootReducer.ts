import { AnyAction, combineReducers } from '@reduxjs/toolkit';
import { simulatorSlice } from './slices/simulatorSlice';
const combinedReducer = combineReducers({
  simulator: simulatorSlice.reducer,
});
export const rootReducer = (state: any, action: AnyAction) => {
  return combinedReducer(state, action);
};

export type RootReducer = typeof rootReducer;
