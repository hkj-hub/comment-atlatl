import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const stateSelector = (state: RootState) => state.message;

export const messageSelector = createSelector(stateSelector, (c) => {
  const ret = c.ids.map((id) => c.entities[id]!); // Message | undefined にならないように Non-null Assertion Operator （ ! ） をつける
  return ret;
});
