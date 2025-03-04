import { createSelector } from '@reduxjs/toolkit';

const stateSelector = (state: RootState) => state.message;

export const messageSelector = createSelector(stateSelector, (c) => {
  const ret = c.ids.map((id) => c.entities[id]).filter((v) => v != null);
  return ret;
});
