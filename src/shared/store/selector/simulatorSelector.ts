import { createSelector } from '@reduxjs/toolkit';

const stateSelector = (state: RootState) => state.simulator;

export const textsSelector = createSelector(stateSelector, (c) => {
  return c.texts;
});
