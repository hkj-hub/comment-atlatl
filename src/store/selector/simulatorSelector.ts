import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const stateSelector = (state: RootState) => state.simulator;

export const textsSelector = createSelector(stateSelector, (c) => {
  return c.texts;
});
