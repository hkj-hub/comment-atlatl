import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const stateSelector = (state: RootState) => state.message;

export const messageSelector = createSelector(stateSelector, (c) => {
  return c.ids.map((id) => c.entities[id]);
});
