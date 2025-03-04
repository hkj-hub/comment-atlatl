import { createSelector, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type GraphDataFromKuzu = {
  data: {
    id?: string;
    source?: string;
    target?: string;
    label?: string;
    type: string;
    peerId?: string;
  };
};
export interface GraphState {
  graph: GraphDataFromKuzu[];
  selectedId: string | null;
}

const initialState: GraphState = {
  graph: [],
  selectedId: null,
};

export const graphSlice = createSlice({
  name: 'graphState',
  initialState,
  reducers: {
    setGraph: (state, action: PayloadAction<GraphDataFromKuzu[]>) => {
      state.graph = action.payload;
    },
    setSelectedId: (state, action: PayloadAction<string | null>) => {
      state.selectedId = action.payload;
    },
  },
});

const stateSelector = (state: RootState) => state[graphSlice.reducerPath];

export const graphSelector = createSelector(stateSelector, (c) => {
  return c.graph;
});
